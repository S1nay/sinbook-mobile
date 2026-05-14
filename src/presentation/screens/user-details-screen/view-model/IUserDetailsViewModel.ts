import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export interface IUserDetailsViewModel {
  user: IUser | null;
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;
  isRefreshing: boolean;

  load(userId: number): Promise<void>;
  refresh(): Promise<void>;
  loadMorePosts(page: number): Promise<void>;
}

export namespace IUserDetailsViewModel {
  export const $: ServiceIdentifier<IUserDetailsViewModel> = Symbol('IUserDetailsViewModel');
}
