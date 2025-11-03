import { ServiceIdentifier } from 'inversify';

import { ICreatePostRequestDto } from '@domain/dto/ICreatePostDto';
import { IPagination, IPost } from '@domain/models';

export interface IPostRepository {
  getPosts(params: Record<string, string>): Promise<IPagination<IPost>>;
  updatePost(id: number): Promise<IPost>;
  deletePost(id: number): Promise<void>;
  createPost(dto: ICreatePostRequestDto): Promise<IPost>;
}

export namespace IPostRepository {
  export const $: ServiceIdentifier<IPostRepository> = Symbol('IPostRepository');
}
