import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IPostApi } from '@data/api';
import { PostMapper } from '@data/mappers';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class PostRepository implements IPostRepository {
  constructor(@inject(IPostApi.$) private postApi: IPostApi) {}

  async getPosts(params?: GetPostsRequestParams): Promise<IPagination<IPost>> {
    return this.postApi
      .getPosts(params)
      .then(getDataFromHttpResponse)
      .then(data => PostMapper.toPage(data))
      .catch(getErrorFromHttpResponse);
  }

  async updatePost(id: number, dto: IPatchPostRequestDto): Promise<IPost> {
    return this.postApi
      .updatePost(id, dto)
      .then(getDataFromHttpResponse)
      .then(post => PostMapper.toEntity(post))
      .catch(getErrorFromHttpResponse);
  }

  async deletePost(id: number): Promise<void> {
    return this.postApi
      .deletePost(id)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async createPost(dto: ICreatePostRequestDto): Promise<IPost> {
    return this.postApi
      .createPost(dto)
      .then(getDataFromHttpResponse)
      .then(post => PostMapper.toEntity(post))
      .catch(getErrorFromHttpResponse);
  }
}

export default PostRepository;
