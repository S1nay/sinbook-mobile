import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IPostApi } from '@data/api';
import { IPostsStore } from '@data/store';
import { ICreatePostRequestDto, IPatchPostRequestDto } from '@domain/dto';
import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class PostRepository implements IPostRepository {
  constructor(
    @inject(IPostApi.$) private postApi: IPostApi,
    @inject(IPostsStore.$) private postsStore: IPostsStore,
  ) {}

  async getPosts(params?: GetPostsRequestParams): Promise<IPagination<IPost>> {
    return this.postApi
      .getPosts(params)
      .then(getDataFromHttpResponse)
      .then(data => {
        this.postsStore.upsertMany(data.results);
        return data;
      })
      .catch(getErrorFromHttpResponse);
  }

  getPostsByIds(ids: number[]): IPost[] {
    return this.postsStore.getMany(ids);
  }

  patchPost(id: number, partial: Partial<IPost>): void {
    this.postsStore.patch(id, partial);
  }

  upsertPost(post: IPost): IPost {
    return this.postsStore.upsert(post);
  }

  clearPosts(): void {
    this.postsStore.clear();
  }

  async updatePost(id: number, dto: IPatchPostRequestDto): Promise<IPost> {
    return this.postApi
      .updatePost(id, dto)
      .then(getDataFromHttpResponse)
      .then(post => this.postsStore.upsert(post))
      .catch(getErrorFromHttpResponse);
  }

  async deletePost(id: number): Promise<void> {
    return this.postApi
      .deletePost(id)
      .then(getDataFromHttpResponse)
      .then(() => this.postsStore.remove(id))
      .catch(getErrorFromHttpResponse);
  }

  async createPost(dto: ICreatePostRequestDto): Promise<IPost> {
    return this.postApi
      .createPost(dto)
      .then(getDataFromHttpResponse)
      .then(post => this.postsStore.upsert(post))
      .catch(getErrorFromHttpResponse);
  }
}

export default PostRepository;
