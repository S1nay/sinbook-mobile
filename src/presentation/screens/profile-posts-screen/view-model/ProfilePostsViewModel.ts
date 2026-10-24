import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IPost, IMeta, IPagination, IUser } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
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

  get isLoading(): boolean {
    return this._isLoading;
  }

  get posts(): Array<IPost> {
    return this.getPostsByIdsUseCase.execute(this._postIds);
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
    return this.likePostUseCase.execute(postId).catch(({ message }: IHttpError) => {
      Toast.show({ text1: message as string, type: Toasts.Error });
    });
  }
}

export default ProfilePostsViewModel;
