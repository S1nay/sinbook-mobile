import { ServiceIdentifier } from 'inversify';

import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';

export interface IPostRepository {
  getPosts(params?: GetPostsRequestParams): Promise<IPagination<IPost>>;
  updatePost(id: number, dto: IPatchPostRequestDto): Promise<IPost>;
  deletePost(id: number): Promise<void>;
  createPost(dto: ICreatePostRequestDto): Promise<IPost>;

  getLoggedInUserPosts(): IPagination<IPost> | null;
  setLoggedInUserPosts(posts: IPagination<IPost> | null): void;
}

export namespace IPostRepository {
  export const $: ServiceIdentifier<IPostRepository> = Symbol('IPostRepository');
}
