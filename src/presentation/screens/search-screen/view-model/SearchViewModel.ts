import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams, GetUsersRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
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
    @inject(PostUseCases.$GetPostsByIds)
    private getPostsByIdsUseCase: UseCase<number[], IPost[], IPost[]>,
    @inject(PostUseCases.$LikePost)
    private likePostUseCase: UseCase<number, void>,
    @inject(UserUseCases.$GetCurrentUser)
    private getCurrentUserUseCase: UseCase<boolean, IUser>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.getCurrentUserUseCase
      .execute(true)
      .then(user => {
        this.currentUserId = user.id;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }

  get posts(): IPost[] {
    return this.getPostsByIdsUseCase.execute(this._postIds);
  }

  get postsMeta(): IMeta | null {
    return this._postsMeta;
  }

  get users(): IUser[] {
    return this._users;
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
    return this.likePostUseCase.execute(postId).catch(({ message }: IHttpError) => {
      Toast.show({ text1: message as string, type: Toasts.Error });
    });
  }
}

export default SearchViewModel;
