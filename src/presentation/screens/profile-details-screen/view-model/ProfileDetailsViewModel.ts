import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams, GetUserRequestParams } from '@domain/request-params';
import { AuthUseCases, UserUseCases, PostUseCases } from '@domain/use-cases';

import { IProfileDetailsViewModel } from './IProfileDetailsViewModel';

@injectable()
class ProfileDetailsViewModel implements IProfileDetailsViewModel {
  private _user: IUser | null = null;
  private _isLoading: boolean = false;
  private _posts: Array<IPost> = [];
  private _postsMeta: IMeta | null = null;

  constructor(
    @inject(AuthUseCases.$Logout)
    private logoutUseCase: UseCase<void, void>,
    @inject(UserUseCases.$GetUser)
    private getUserUseCase: UseCase<GetUserRequestParams & { isRefetching: boolean }, IUser>,
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<
      GetPostsRequestParams & { isRefetching: boolean; isPagination?: boolean },
      IPagination<IPost>
    >,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get user(): IUser | null {
    return this._user;
  }

  get isLoading(): boolean {
    return this._isLoading;
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

  private set user(value: IUser) {
    this._user = value;
  }

  private set postsMeta(value: IMeta) {
    this._postsMeta = value;
  }

  private set posts(value: Array<IPost>) {
    this._posts = value;
  }

  async getUserData(params: GetUserRequestParams & { isRefetching: boolean }): Promise<IUser> {
    const { isRefetching = false, id } = params;

    this.isLoading = true;

    return this.getUserUseCase
      .execute({ id, isRefetching })
      .then(user => {
        this.user = user;
        return user;
      })
      .catch()
      .finally(() => {
        this.isLoading = false;
      });
  }

  async getUserPosts(
    params: GetPostsRequestParams & { isRefetching: boolean; isPagination: boolean },
  ): Promise<void> {
    const { userId, isRefetching = false, isPagination = false, perPage = 20, page = 1 } = params;

    if (!isPagination) this.isLoading = true;

    return this.getUserPostsUseCase
      .execute({ userId, isRefetching, isPagination, perPage, page })
      .then(data => {
        this.posts = data.results;
        this.postsMeta = data.meta;
      })
      .catch()
      .finally(() => {
        if (!isPagination) this.isLoading = false;
      });
  }

  logout(callback: PureFunction) {
    this.logoutUseCase.execute().then(callback);
  }
}

export default ProfileDetailsViewModel;
