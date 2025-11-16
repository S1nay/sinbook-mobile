import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IPostApi } from '@data/api';
import { IPostStore } from '@data/store';
import { ICreatePostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class PostRepository implements IPostRepository {
  constructor(
    @inject(IPostApi.$) private postApi: IPostApi,
    @inject(IPostStore.$) private postStore: IPostStore,
  ) {}

  getLoggedInUserPosts(): IPagination<IPost> | null {
    return this.postStore.loggedInUserPosts;
  }

  setLoggedInUserPosts(posts: IPagination<IPost> | null): void {
    this.postStore.setLoggedInUserPosts(posts);
  }

  async getPosts(params?: GetPostsRequestParams): Promise<IPagination<IPost>> {
    return this.postApi
      .getPosts(params)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async updatePost(id: number): Promise<IPost> {
    return this.postApi
      .updatePost(id)
      .then(getDataFromHttpResponse)
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
      .catch(getErrorFromHttpResponse);
  }
}

export default PostRepository;
