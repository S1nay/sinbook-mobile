import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse } from '@core/helpers';
import { IPostApi } from '@data/api/post';
import { ICreatePostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories/IPostRepository';

@injectable()
class PostRepository implements IPostRepository {
  constructor(@inject(IPostApi.$) private postApi: IPostApi) {}

  async getPosts(params: Record<string, string>): Promise<IPagination<IPost>> {
    return this.postApi.getPosts(params).then(getDataFromHttpResponse);
  }

  async updatePost(id: number): Promise<IPost> {
    return this.postApi.updatePost(id).then(getDataFromHttpResponse);
  }

  async deletePost(id: number): Promise<void> {
    return this.postApi.deletePost(id).then(getDataFromHttpResponse);
  }

  async createPost(dto: ICreatePostRequestDto): Promise<IPost> {
    return this.postApi.createPost(dto).then(getDataFromHttpResponse);
  }
}

export default PostRepository;
