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
  private _userId: number | null = null;
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

  async load(userId: number): Promise<void> {
    this._userId = userId;
    this.isLoading = true;
    try {
      const data = await this.getUserPostsUseCase.execute({
        userId,
        perPage: 20,
        page: 1,
        sortedBy: 'desc',
      });
      this.posts = data.results;
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isLoading = false;
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

export default ProfilePostsViewModel;
