import { inject } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IPost, IMeta, IPagination } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases } from '@domain/use-cases';

import { IProfilePostsViewModel } from './IProfilePostsViewModel';

class ProfilePostsViewModel implements IProfilePostsViewModel {
  private _posts: IPost[] = [];
  private _postsMeta: IMeta | null = null;
  private _isLoading: boolean = false;

  constructor(
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<
      GetPostsRequestParams & { isPagination?: boolean },
      IPagination<IPost>
    >,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
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

  private set postsMeta(value: IMeta | null) {
    this._postsMeta = value;
  }

  private set posts(value: Array<IPost>) {
    this._posts = value;
  }

  async getUserPosts(params: GetPostsRequestParams & { isPagination?: boolean }): Promise<void> {
    const { userId, isPagination = false, perPage = 20, page = 1 } = params;

    if (!isPagination) this.isLoading = true;

    return this.getUserPostsUseCase
      .execute({ userId, isPagination, perPage, page })
      .then(data => {
        this.posts = data.results;
        this.postsMeta = data.meta;
      })
      .catch()
      .finally(() => {
        if (!isPagination) this.isLoading = false;
      });
  }
}

export default ProfilePostsViewModel;
