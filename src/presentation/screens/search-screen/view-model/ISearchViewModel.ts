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

  loadPosts(search?: string): Promise<void>;
  loadUsers(search?: string): Promise<void>;
  refreshPosts(): Promise<void>;
  refreshUsers(): Promise<void>;
  loadMorePosts(page: number, search: string): Promise<void>;
  loadMoreUsers(page: number, search: string): Promise<void>;
}

export namespace ISearchViewModel {
  export const $: ServiceIdentifier<ISearchViewModel> = Symbol('ISearchViewModel');
}
