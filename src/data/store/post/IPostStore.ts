import { ServiceIdentifier } from 'inversify';

import { IPagination, IPost } from '@domain/models';

export interface IPostStore {
  loggedInUserPosts: IPagination<IPost> | null;
  setLoggedInUserPosts(posts: IPagination<IPost> | null): void;
}

export namespace IPostStore {
  export const $: ServiceIdentifier<IPostStore> = Symbol('IPostStore');
}
