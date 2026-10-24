import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { ILikeApi } from '@data/api';
import { ILikeStore } from '@data/store';
import { ILikeRequestDto } from '@domain/dto';
import { IPost } from '@domain/models';
import { ILikeRepository } from '@domain/repositories';

@injectable()
class LikeRepository implements ILikeRepository {
  constructor(
    @inject(ILikeApi.$) private likeApi: ILikeApi,
    @inject(ILikeStore.$) private likeStore: ILikeStore,
  ) {}

  async likePost(dto: ILikeRequestDto): Promise<IPost> {
    return this.likeApi.likePost(dto).then(getDataFromHttpResponse).catch(getErrorFromHttpResponse);
  }

  getPendingLike(postId: number): boolean | undefined {
    return this.likeStore.getPendingLike(postId);
  }

  setPendingLike(postId: number, isLiked: boolean): void {
    this.likeStore.setPendingLike(postId, isLiked);
  }

  removePendingLike(postId: number): void {
    this.likeStore.removePendingLike(postId);
  }

  isLikeSyncing(postId: number): boolean {
    return this.likeStore.isSyncing(postId);
  }

  setLikeSyncing(postId: number, isSyncing: boolean): void {
    this.likeStore.setSyncing(postId, isSyncing);
  }

  clearLikes(): void {
    this.likeStore.clear();
  }
}

export default LikeRepository;
