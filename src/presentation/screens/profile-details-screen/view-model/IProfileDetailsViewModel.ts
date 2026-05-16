import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export interface IProfileDetailsViewModel {
  user: IUser | null;
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;
  isRefreshing: boolean;

  load(): Promise<void>;
  loadUser(): Promise<void>;
  refresh(): Promise<void>;
  loadMorePosts(page: number): Promise<void>;
}

export namespace IProfileDetailsViewModel {
  export const $: ServiceIdentifier<IProfileDetailsViewModel> = Symbol('IProfileDetailsViewModel');
}
