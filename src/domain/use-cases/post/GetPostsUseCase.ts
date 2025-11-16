import { inject, injectable } from 'inversify';

import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories/IPostRepository';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class GetPostsUseCase {
  constructor(@inject(IPostRepository.$) private postRepository: IPostRepository) {}

  async execute(params?: GetPostsRequestParams): Promise<IPagination<IPost>> {
    const posts = await this.postRepository.getPosts(params);

    return posts;
  }
}

export default GetPostsUseCase;
