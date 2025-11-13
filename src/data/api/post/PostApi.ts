import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { ICreatePostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';

import { IPostApi } from './IPostApi';

@injectable()
class PostApi implements IPostApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}
  getPosts(params: Record<string, string>): Promise<IHttpResponse<IPagination<IPost>>> {
    return this.httpClient.get<IPagination<IPost>>('/post', { params });
  }

  updatePost(id: number): Promise<IHttpResponse<IPost>> {
    return this.httpClient.patch<IPost>(`/post/${id}`);
  }

  deletePost(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/post/${id}`);
  }

  createPost(dto: ICreatePostRequestDto): Promise<IHttpResponse<IPost>> {
    return this.httpClient.post('/post', { params: dto });
  }
}

export default PostApi;
