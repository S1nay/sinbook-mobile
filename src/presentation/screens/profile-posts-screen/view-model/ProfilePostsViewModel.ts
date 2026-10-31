import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { Identifiers } from '@core/di/identifiers';
import { mergeArraysWithoutDuplicates, setListMembership } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { IPost, IMeta, IPagination, IUser } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import { MaintenanceRouteNames, MaintenanceStackParamList } from '@navigation/configuration';
import { IPostsStore, IUserStore } from '@presentation/store';
import { Toasts } from '@ui/toast';

import { IProfilePostsViewModel } from './IProfilePostsViewModel';

@injectable()
class ProfilePostsViewModel implements IProfilePostsViewModel {
  private _postIds: number[] = [];
  private _postsMeta: IMeta | null = null;
  private _isLoading: boolean = false;
  private _currentUserId: number | null = null;

  constructor(
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<GetPostsRequestParams, IPagination<IPost>>,
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

  get isLoading(): boolean {
    return this._isLoading;
  }

  get posts(): Array<IPost> {
    return this.postsStore.getMany(this._postIds);
  }

  get postsMeta(): IMeta | null {
    return this._postsMeta;
  }

  get currentUserId(): number | null {
    return this._currentUserId;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set postsMeta(value: IMeta | null) {
    this._postsMeta = value;
  }

  private set currentUserId(value: number | null) {
    this._currentUserId = value;
  }

  private set postIds(value: number[]) {
    this._postIds = value;
  }

  async load(postIds: number[], meta: IMeta): Promise<void> {
    this.postIds = postIds;
    this.postsMeta = meta;
  }

  async loadMorePosts(page: number, userId: number): Promise<void> {
    this.getUserPostsUseCase
      .execute({
        userId,
        perPage: 20,
        page,
        sortedBy: 'desc',
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
    this.isLoading = true;

    try {
      await this.deletePostUseCase.execute(postId);

      // getMany пропускает удалённые id — пост исчезнет из всех списков
      this.postsStore.remove(postId);

      const currentUser = this.userStore.userData;
      if (currentUser) {
        this.userStore.setUserData({ ...currentUser, postsCount: currentUser.postsCount - 1 });
      }

      Toast.show({ text1: 'Post removed', type: Toasts.Success });

      // на пустом экране делать нечего — возвращаемся в профиль
      if (this.posts.length === 0) this.navigationService.goBack();
    } catch (error) {
      Toast.show({ text1: (error as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isLoading = false;
    }
  }
}

export default ProfilePostsViewModel;
