import { ServiceIdentifier } from 'inversify';

import { ICreatePostRequestDto } from '@domain/dto/ICreatePostDto';
import { IPagination, IPost } from '@domain/models';
import { IHttpResponse } from '@infrastructure/http/entities';

export interface IPostApi {
  getPosts(params: Record<string, string>): Promise<IHttpResponse<IPagination<IPost>>>;
  updatePost(id: number): Promise<IHttpResponse<IPost>>;
  deletePost(id: number): Promise<IHttpResponse<void>>;
  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPost>>;
}

export namespace IPostApi {
  export const $: ServiceIdentifier<IPostApi> = Symbol('IPostApi');
}
