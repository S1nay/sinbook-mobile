import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';
import { GetPostsMode } from '@domain/use-cases/post';

export interface IProfilePostsViewModel {
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  getUserPosts(params: GetPostsRequestParams & { mode: GetPostsMode }): Promise<void>;
}

export namespace IProfilePostsViewModel {
  export const $: ServiceIdentifier<IProfilePostsViewModel> = Symbol('IProfilePostsViewModel');
}
