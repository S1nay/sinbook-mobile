import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IPaginationResponseDto, IPostResponseDto } from '@data/dto/response';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { GetPostsRequestParams } from '@domain/request-params';

export interface IPostApi {
  getPosts(
    params?: GetPostsRequestParams,
  ): Promise<IHttpResponse<IPaginationResponseDto<IPostResponseDto>>>;
  updatePost(id: number, dto: IPatchPostRequestDto): Promise<IHttpResponse<IPostResponseDto>>;
  deletePost(id: number): Promise<IHttpResponse<void>>;
  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPostResponseDto>>;
}

export namespace IPostApi {
  export const $: ServiceIdentifier<IPostApi> = Symbol('IPostApi');
}
