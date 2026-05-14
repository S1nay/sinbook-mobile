import { ServiceIdentifier } from 'inversify';

import { IMeta, IPost, IUser } from '@domain/models';

export type SearchMode = 'initial' | 'pagination';

export interface ISearchViewModel {
  posts: IPost[];
  postsMeta: IMeta | null;
  users: IUser[];
  usersMeta: IMeta | null;
  isLoading: boolean;

  getPosts(params: { page?: number; mode: SearchMode }): Promise<void>;
  getUsers(params: { page?: number; mode: SearchMode }): Promise<void>;
}

export namespace ISearchViewModel {
  export const $: ServiceIdentifier<ISearchViewModel> = Symbol('ISearchViewModel');
}
