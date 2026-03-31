import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';

export interface IProfilePostsViewModel {
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  getUserPosts(params: GetPostsRequestParams & { isPagination?: boolean }): Promise<void>;
}

export namespace IProfilePostsViewModel {
  export const $: ServiceIdentifier<IProfilePostsViewModel> = Symbol('IProfilePostsViewModel');
}
