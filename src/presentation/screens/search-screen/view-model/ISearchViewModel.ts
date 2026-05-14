import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export interface ISearchViewModel {
  posts: IPost[];
  postsMeta: IMeta | null;
  users: IUser[];
  usersMeta: IMeta | null;
  isPostsLoading: boolean;
  isUsersLoading: boolean;
  isPostsRefreshing: boolean;
  isUsersRefreshing: boolean;

  loadPosts(): Promise<void>;
  loadUsers(): Promise<void>;
  refreshPosts(): Promise<void>;
  refreshUsers(): Promise<void>;
  loadMorePosts(page: number): Promise<void>;
  loadMoreUsers(page: number): Promise<void>;
}

export namespace ISearchViewModel {
  export const $: ServiceIdentifier<ISearchViewModel> = Symbol('ISearchViewModel');
}
