import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IPost, IMeta, IPagination } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases } from '@domain/use-cases';
import { Toasts } from '@ui/toast';

import { IProfilePostsViewModel } from './IProfilePostsViewModel';

@injectable()
class ProfilePostsViewModel implements IProfilePostsViewModel {
  private _posts: IPost[] = [];
  private _postsMeta: IMeta | null = null;
  private _isLoading: boolean = false;

  constructor(
    @inject(PostUseCases.$GetUserPosts)
    private getUserPostsUseCase: UseCase<GetPostsRequestParams, IPagination<IPost>>,
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

  load(posts: Array<IPost>, meta: IMeta): void {
    this.posts = posts;
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
        this.posts = mergeArraysWithoutDuplicates(this.posts, data.results, 'id');
        this.postsMeta = data.meta;
      })
      .catch(({ message }: IHttpError) => {
        Toast.show({ text1: message as string, type: Toasts.Error });
      });
  }
}

export default ProfilePostsViewModel;
