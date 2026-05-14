import { inject, injectable } from 'inversify';

import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class GetUserPostsUseCase {
  constructor(@inject(IPostRepository.$) private postRepository: IPostRepository) {}

  async execute(params: GetPostsRequestParams): Promise<IPagination<IPost>> {
    return this.postRepository.getPosts(params);
  }
}

export default GetUserPostsUseCase;
