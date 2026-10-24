import { ServiceIdentifier } from 'inversify';

export interface ILikeStore {
  getPendingLike(postId: number): boolean | undefined;
  setPendingLike(postId: number, isLiked: boolean): void;
  removePendingLike(postId: number): void;
  isSyncing(postId: number): boolean;
  setSyncing(postId: number, isSyncing: boolean): void;
  clear(): void;
}

export namespace ILikeStore {
  export const $: ServiceIdentifier<ILikeStore> = Symbol('ILikeStore');
}
