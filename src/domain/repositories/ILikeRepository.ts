import { ServiceIdentifier } from 'inversify';

import { ILikeRequestDto } from '@domain/dto';
import { IPost } from '@domain/models';

export interface ILikeRepository {
  likePost(dto: ILikeRequestDto): Promise<IPost>;
  getPendingLike(postId: number): boolean | undefined;
  setPendingLike(postId: number, isLiked: boolean): void;
  removePendingLike(postId: number): void;
  isLikeSyncing(postId: number): boolean;
  setLikeSyncing(postId: number, isSyncing: boolean): void;
  clearLikes(): void;
}

export namespace ILikeRepository {
  export const $: ServiceIdentifier<ILikeRepository> = Symbol('ILikeRepository');
}
