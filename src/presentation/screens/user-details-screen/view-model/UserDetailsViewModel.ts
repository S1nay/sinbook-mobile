import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import { IPostsStore } from '@presentation/store';
import { Toasts } from '@ui/toast';

import { IUserDetailsViewModel } from './IUserDetailsViewModel';

@injectable()
class UserDetailsViewModel implements IUserDetailsViewModel {
  private _user: IUser | null = null;
  private _isLoading: boolean = false;
  private _isRefreshing: boolean = false;
  private _postIds: number[] = [];
  private _postsMeta: IMeta | null = null;

  constructor(
    @inject(UserUseCases.$GetUserById)
    private getUserByIdUseCase: UseCase<number, IUser>,
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<GetPostsRequestParams, IPagination<IPost>>,
    @inject(IPostsStore.$) private postsStore: IPostsStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get user(): IUser | null {
    return this._user;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  get posts(): Array<IPost> {
    return this.postsStore.getMany(this._postIds);
  }

  get postsMeta(): IMeta | null {
    return this._postsMeta;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  private set isRefreshing(value: boolean) {
    this._isRefreshing = value;
  }

  private set user(value: IUser | null) {
    this._user = value;
  }

  private set postsMeta(value: IMeta | null) {
    this._postsMeta = value;
  }

  private set postIds(value: number[]) {
    this._postIds = value;
  }

  async load(userId: number): Promise<void> {
    this.user = null;
    this.postIds = [];
    this.isLoading = true;

    Promise.all([
      this.getUserByIdUseCase.execute(userId),
      this.getUserPostsUseCase.execute({ userId, perPage: 20, page: 1, sortedBy: 'desc' }),
    ])
      .then(([user, data]) => {
        this.user = user;
        this.postsStore.upsertMany(data.results);
        this.postIds = data.results.map(p => p.id);
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async refresh(): Promise<void> {
    if (!this.user) return;

    this.isRefreshing = true;

    Promise.all([
      this.getUserByIdUseCase.execute(this.user.id),
      this.getUserPostsUseCase.execute({
        userId: this.user.id,
        perPage: 20,
        page: 1,
        sortedBy: 'desc',
      }),
    ])
      .then(([user, data]) => {
        this.user = user;
        this.postsStore.upsertMany(data.results);
        this.postIds = data.results.map(p => p.id);
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      })
      .finally(() => {
        this.isRefreshing = false;
      });
  }

  async loadMorePosts(page: number): Promise<void> {
    if (!this.user) return;

    this.getUserPostsUseCase
      .execute({
        userId: this.user.id,
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
}

export default UserDetailsViewModel;
