import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import { Toasts } from '@ui/toast';

import { IUserDetailsViewModel } from './IUserDetailsViewModel';

@injectable()
class UserDetailsViewModel implements IUserDetailsViewModel {
  private _userId: number | null = null;
  private _user: IUser | null = null;
  private _isLoading: boolean = false;
  private _isRefreshing: boolean = false;
  private _posts: Array<IPost> = [];
  private _postsMeta: IMeta | null = null;

  constructor(
    @inject(UserUseCases.$GetUserById)
    private getUserByIdUseCase: UseCase<number, IUser>,
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<GetPostsRequestParams, IPagination<IPost>>,
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
    return this._posts;
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

  private set posts(value: Array<IPost>) {
    this._posts = value;
  }

  async load(userId: number): Promise<void> {
    this._userId = userId;
    this._user = null;
    this._posts = [];
    this.isLoading = true;

    try {
      const [user, data] = await Promise.all([
        this.getUserByIdUseCase.execute(userId),
        this.getUserPostsUseCase.execute({ userId, perPage: 20, page: 1, sortedBy: 'desc' }),
      ]);

      this.user = user;
      this.posts = data.results;
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isLoading = false;
    }
  }

  async refresh(): Promise<void> {
    if (!this._userId) return;

    this.isRefreshing = true;

    try {
      const [user, data] = await Promise.all([
        this.getUserByIdUseCase.execute(this._userId),
        this.getUserPostsUseCase.execute({
          userId: this._userId,
          perPage: 20,
          page: 1,
          sortedBy: 'desc',
        }),
      ]);

      this.user = user;
      this.posts = data.results;
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isRefreshing = false;
    }
  }

  async loadMorePosts(page: number): Promise<void> {
    if (!this._userId) return;

    try {
      const data = await this.getUserPostsUseCase.execute({
        userId: this._userId,
        perPage: 20,
        page,
        sortedBy: 'desc',
      });

      this.posts = mergeArraysWithoutDuplicates(this._posts, data.results, 'id');
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    }
  }
}

export default UserDetailsViewModel;
