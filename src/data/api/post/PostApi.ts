import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { GetPostsRequestParams } from '@domain/request-params';

import { IPostApi } from './IPostApi';

@injectable()
class PostApi implements IPostApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}
  getPosts(params?: GetPostsRequestParams): Promise<IHttpResponse<IPagination<IPost>>> {
    return this.httpClient.get<IPagination<IPost>>('/post', params ? { params } : undefined);
  }

  updatePost(id: number, dto: IPatchPostRequestDto): Promise<IHttpResponse<IPost>> {
    return this.httpClient.patch<IPost>(`/post/${id}`, dto);
  }

  deletePost(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/post/${id}`);
  }

  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPost>> {
    return this.httpClient.post('/post', dto);
  }
}

export default PostApi;
