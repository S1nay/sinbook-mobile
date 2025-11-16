import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IMeta, IPagination, IPost, IUser } from '@domain/models';
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
    private getUserUseCase: UseCase<number | undefined, IUser>,
    @inject(PostUseCases.$GetPosts)
    private getPostsUseCase: UseCase<
      Record<string, number | string | undefined>,
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

  getUserData(id?: number) {
    this.isLoading = true;

    this.getUserUseCase
      .execute(id)
      .then(user => {
        this.user = user;
      })
      .catch()
      .finally(() => {
        this.isLoading = false;
      });
  }

  getUserPosts(userId: number) {
    this.isLoading = true;

    this.getPostsUseCase
      .execute({ userId })
      .then(data => {
        this.posts = data.results;
        this.postsMeta = data.meta;
      })
      .catch()
      .finally(() => {
        this.isLoading = false;
      });
  }

  logout(callback: PureFunction) {
    this.logoutUseCase.execute().then(callback);
  }
}

export default ProfileDetailsViewModel;
