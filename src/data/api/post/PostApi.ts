import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { IPaginationResponseDto, IPostResponseDto } from '@data/dto/response';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { GetPostsRequestParams } from '@domain/request-params';

import { IPostApi } from './IPostApi';

@injectable()
class PostApi implements IPostApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}
  getPosts(
    params?: GetPostsRequestParams,
  ): Promise<IHttpResponse<IPaginationResponseDto<IPostResponseDto>>> {
    return this.httpClient.get<IPaginationResponseDto<IPostResponseDto>>(
      '/post',
      params ? { params } : undefined,
    );
  }

  updatePost(id: number, dto: IPatchPostRequestDto): Promise<IHttpResponse<IPostResponseDto>> {
    return this.httpClient.patch<IPostResponseDto>(`/post/${id}`, dto);
  }

  deletePost(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/post/${id}`);
  }

  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPostResponseDto>> {
    return this.httpClient.post('/post', dto);
  }
}

export default PostApi;
