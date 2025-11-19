import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';
import { GetPostsRequestParams, GetUserRequestParams } from '@domain/request-params';

export interface IProfileDetailsViewModel {
  user: IUser | null;
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  getUserData(params: GetUserRequestParams & { isRefetching?: boolean }): Promise<IUser>;
  getUserPosts(
    params: GetPostsRequestParams & { isRefetching?: boolean; isPagination?: boolean },
  ): Promise<void>;
  logout: (callback: PureFunction) => void;
}

export namespace IProfileDetailsViewModel {
  export const $: ServiceIdentifier<IProfileDetailsViewModel> = Symbol('IProfileDetailsViewModel');
}
