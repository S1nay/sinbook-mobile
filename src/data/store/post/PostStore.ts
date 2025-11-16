import { makeAutoObservable } from 'mobx';

import { IPagination, IPost } from '@domain/models';

import { IPostStore } from './IPostStore';

class PostStore implements IPostStore {
  private _loggedInUserPosts: IPagination<IPost> | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loggedInUserPosts(): IPagination<IPost> | null {
    return this._loggedInUserPosts;
  }

  setLoggedInUserPosts(posts: IPagination<IPost> | null): void {
    this._loggedInUserPosts = posts;
  }
}

export default PostStore;
