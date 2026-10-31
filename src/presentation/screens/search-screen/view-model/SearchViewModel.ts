import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { Identifiers } from '@core/di/identifiers';
import { mergeArraysWithoutDuplicates, setListMembership } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams, GetUsersRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import { MaintenanceRouteNames, MaintenanceStackParamList } from '@navigation/configuration';
import { IPostsStore, IUserStore } from '@presentation/store';
import { Toasts } from '@ui/toast';

import { ISearchViewModel } from './ISearchViewModel';

@injectable()
class SearchViewModel implements ISearchViewModel {
  private _postIds: number[] = [];
  private _postsMeta: IMeta | null = null;
  private _users: IUser[] = [];
  private _usersMeta: IMeta | null = null;
  private _isPostsLoading: boolean = false;
  private _isUsersLoading: boolean = false;
  private _isPostsRefreshing: boolean = false;
  private _isUsersRefreshing: boolean = false;
  private _currentUserId: number | null = null;
  // счётчики запросов: ответы устаревших запросов поиска игнорируются
  private postsRequestId = 0;
  private usersRequestId = 0;

  constructor(
    @inject(PostUseCases.$SearchPosts)
    private searchPostsUseCase: UseCase<GetPostsRequestParams, IPagination<IPost>>,
    @inject(UserUseCases.$SearchUsers)
    private searchUsersUseCase: UseCase<GetUsersRequestParams, IPagination<IUser>>,
    @inject(UserUseCases.$GetCurrentUser)
    private getCurrentUserUseCase: UseCase<void, IUser>,
    @inject(PostUseCases.$LikePost)
    private likePostUseCase: UseCase<number, IPost>,
    @inject(PostUseCases.$DeletePost)
    private deletePostUseCase: UseCase<number, void>,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<MaintenanceStackParamList>,
    @inject(IPostsStore.$) private postsStore: IPostsStore,
    @inject(IUserStore.$) private userStore: IUserStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.initCurrentUser();
  }

  private initCurrentUser(): void {
    const cached = this.userStore.userData;
    if (cached) {
      this.currentUserId = cached.id;
      return;
    }

    this.getCurrentUserUseCase
      .execute()
      .then(user => {
        this.userStore.setUserData(user);
        this.currentUserId = user.id;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }

  get posts(): IPost[] {
    return this.postsStore.getMany(this._postIds);
  }

  get postsMeta(): IMeta | null {
    return this._postsMeta;
  }

  // себя в поиске пользователей не показываем
  get users(): IUser[] {
    return this._users.filter(user => user.id !== this._currentUserId);
  }

  get usersMeta(): IMeta | null {
    return this._usersMeta;
  }

  get isPostsLoading(): boolean {
    return this._isPostsLoading;
  }

  get isUsersLoading(): boolean {
    return this._isUsersLoading;
  }

  get isPostsRefreshing(): boolean {
    return this._isPostsRefreshing;
  }

  get isUsersRefreshing(): boolean {
    return this._isUsersRefreshing;
  }

  get currentUserId(): number | null {
    return this._currentUserId;
  }

  private set currentUserId(value: number | null) {
    this._currentUserId = value;
  }

  private set postIds(value: number[]) {
    this._postIds = value;
  }

  private set postsMeta(value: IMeta | null) {
    this._postsMeta = value;
  }

  private set users(value: IUser[]) {
    this._users = value;
  }

  private set usersMeta(value: IMeta | null) {
    this._usersMeta = value;
  }

  private set isPostsLoading(value: boolean) {
    this._isPostsLoading = value;
  }

  private set isUsersLoading(value: boolean) {
    this._isUsersLoading = value;
  }

  private set isPostsRefreshing(value: boolean) {
    this._isPostsRefreshing = value;
  }

  private set isUsersRefreshing(value: boolean) {
    this._isUsersRefreshing = value;
  }

  async loadPosts(search?: string): Promise<void> {
    const requestId = ++this.postsRequestId;
    this.isPostsLoading = true;

    this.searchPostsUseCase
      .execute({
        page: 1,
        perPage: 20,
        search,
      })
      .then(data => {
        if (requestId !== this.postsRequestId) return;
        this.postsStore.upsertMany(data.results);
        this.postIds = data.results.map(p => p.id);
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        if (requestId !== this.postsRequestId) return;
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        if (requestId === this.postsRequestId) this.isPostsLoading = false;
      });
  }

  async loadUsers(search?: string): Promise<void> {
    const requestId = ++this.usersRequestId;
    this.isUsersLoading = true;

    this.searchUsersUseCase
      .execute({
        page: 1,
        perPage: 20,
        search,
      })
      .then(data => {
        if (requestId !== this.usersRequestId) return;
        this.users = data.results;
        this.usersMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        if (requestId !== this.usersRequestId) return;
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        if (requestId === this.usersRequestId) this.isUsersLoading = false;
      });
  }

  async refreshPosts(search?: string): Promise<void> {
    this.isPostsRefreshing = true;

    this.searchPostsUseCase
      .execute({
        page: 1,
        perPage: 20,
        search,
      })
      .then(data => {
        this.postsStore.upsertMany(data.results);
        this.postIds = data.results.map(p => p.id);
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        this.isPostsRefreshing = false;
      });
  }

  async refreshUsers(search?: string): Promise<void> {
    this.isUsersRefreshing = true;

    this.searchUsersUseCase
      .execute({
        page: 1,
        perPage: 20,
        search,
      })
      .then(data => {
        this.users = data.results;
        this.usersMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        this.isUsersRefreshing = false;
      });
  }

  async loadMorePosts(page: number, search: string): Promise<void> {
    this.searchPostsUseCase
      .execute({
        page,
        perPage: 20,
        search,
      })
      .then(data => {
        this.postsStore.upsertMany(data.results);
        this.postIds = mergeArraysWithoutDuplicates(
          this._postIds,
          data.results.map(p => p.id),
        );
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }

  async loadMoreUsers(page: number, search: string): Promise<void> {
    this.searchUsersUseCase
      .execute({
        page,
        perPage: 20,
        search,
      })
      .then(data => {
        this.users = mergeArraysWithoutDuplicates(this._users, data.results, 'id');
        this.usersMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }

  async likePost(postId: number): Promise<void> {
    const userId = this._currentUserId;
    if (userId === null) return;

    const post = this.postsStore.get(postId);
    if (!post) return;

    const isLiked = post.likes.includes(userId);
    // мгновенно меняем UI
    this.postsStore.patch(postId, { likes: setListMembership(post.likes, userId, !isLiked) });

    // fire-and-forget: ответ игнорируем, на ошибку откатываем только свой лайк
    return this.likePostUseCase
      .execute(postId)
      .then(() => undefined)
      .catch(({ message }: IHttpError) => {
        const current = this.postsStore.get(postId);

        if (current) {
          this.postsStore.patch(postId, {
            likes: setListMembership(current.likes, userId, isLiked),
          });
        }
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }

  editPost(postId: number): void {
    this.navigationService.navigate(MaintenanceRouteNames.EditPost, { postId });
  }

  async deletePost(postId: number): Promise<void> {
    this.isPostsLoading = true;

    try {
      await this.deletePostUseCase.execute(postId);

      // getMany пропускает удалённые id — пост исчезнет из всех списков
      this.postsStore.remove(postId);

      const currentUser = this.userStore.userData;
      if (currentUser) {
        this.userStore.setUserData({ ...currentUser, postsCount: currentUser.postsCount - 1 });
      }

      Toast.show({ text1: 'Post removed', type: Toasts.Success });
    } catch (error) {
      Toast.show({ text1: (error as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isPostsLoading = false;
    }
  }
}

export default SearchViewModel;
