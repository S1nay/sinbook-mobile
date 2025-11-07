import { inject, injectable } from 'inversify';

import { IPagination, IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories/IPostRepository';

@injectable()
class GetPostsUseCase {
  constructor(@inject(IPostRepository.$) private postRepository: IPostRepository) {}

  async execute(params: Record<string, string>): Promise<IPagination<IPost>> {
    const posts = await this.postRepository.getPosts(params);

    return posts;
  }
}

export default GetPostsUseCase;
