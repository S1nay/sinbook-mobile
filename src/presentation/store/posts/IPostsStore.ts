import { ServiceIdentifier } from 'inversify';

import { IPost } from '@domain/models';

export interface IPostsStore {
  get(id: number): IPost | undefined;
  getMany(ids: number[]): IPost[];
  upsert(data: IPost): IPost;
  upsertMany(items: IPost[]): IPost[];
  patch(id: number, partial: Partial<IPost>): void;
  remove(id: number): void;
  clear(): void;
}

export namespace IPostsStore {
  export const $: ServiceIdentifier<IPostsStore> = Symbol('IPostsStore');
}
