import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';

export interface IPostApi {
  getPosts(params?: GetPostsRequestParams): Promise<IHttpResponse<IPagination<IPost>>>;
  updatePost(id: number, dto: IPatchPostRequestDto): Promise<IHttpResponse<IPost>>;
  deletePost(id: number): Promise<IHttpResponse<void>>;
  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPost>>;
}

export namespace IPostApi {
  export const $: ServiceIdentifier<IPostApi> = Symbol('IPostApi');
}
