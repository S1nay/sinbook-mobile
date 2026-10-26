import { injectable } from 'inversify';
import { makeAutoObservable, observable } from 'mobx';

import { ILikeStore } from './ILikeStore';

@injectable()
class LikeStore implements ILikeStore {
  // желаемое пользователем состояние лайка, ещё не подтверждённое сервером
  private pendingLikes = observable.map<number, boolean>();
  // postId, по которым идёт синхронизация лайка с сервером
  private syncingPostIds = observable.set<number>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getPendingLike(postId: number): boolean | undefined {
    return this.pendingLikes.get(postId);
  }

  setPendingLike(postId: number, isLiked: boolean): void {
    this.pendingLikes.set(postId, isLiked);
  }

  removePendingLike(postId: number): void {
    this.pendingLikes.delete(postId);
  }

  isSyncing(postId: number): boolean {
    return this.syncingPostIds.has(postId);
  }

  setSyncing(postId: number, isSyncing: boolean): void {
    if (isSyncing) this.syncingPostIds.add(postId);
    else this.syncingPostIds.delete(postId);
  }

  clear(): void {
    this.pendingLikes.clear();
    this.syncingPostIds.clear();
  }
}

export default LikeStore;
