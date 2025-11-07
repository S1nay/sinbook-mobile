import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export interface IProfileDetailsViewModel {
  user: IUser | null;
  posts: Array<IPost>;
  postsMeta: IMeta | null;
  isLoading: boolean;

  getUserData(id?: number): void;
  getUserPosts(userId: number): void;
  logout: (callback: PureFunction) => void;
}

export namespace IProfileDetailsViewModel {
  export const $: ServiceIdentifier<IProfileDetailsViewModel> = Symbol('IProfileDetailsViewModel');
}
