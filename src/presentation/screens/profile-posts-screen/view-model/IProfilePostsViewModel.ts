import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost } from '@domain/models';

export interface IProfilePostsViewModel {
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;
  currentUserId: number | null;

  load(postIds: number[], meta: IMeta): Promise<void>;
  loadMorePosts(page: number, userId: number): Promise<void>;
  likePost(postId: number): Promise<void>;
}

export namespace IProfilePostsViewModel {
  export const $: ServiceIdentifier<IProfilePostsViewModel> = Symbol('IProfilePostsViewModel');
}
