import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost } from '@domain/models';

export interface IProfilePostsViewModel {
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  load(posts: Array<IPost>, meta: IMeta): void;
  loadMorePosts(page: number): Promise<void>;
}

export namespace IProfilePostsViewModel {
  export const $: ServiceIdentifier<IProfilePostsViewModel> = Symbol('IProfilePostsViewModel');
}
