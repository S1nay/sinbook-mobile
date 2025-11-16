import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export interface IProfileDetailsViewModel {
  user: IUser | null;
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  getUserData(id?: number, isRefetching?: boolean): Promise<IUser>;
  getUserPosts(userId: number, isRefetching?: boolean): void;
  logout: (callback: PureFunction) => void;
}

export namespace IProfileDetailsViewModel {
  export const $: ServiceIdentifier<IProfileDetailsViewModel> = Symbol('IProfileDetailsViewModel');
}
