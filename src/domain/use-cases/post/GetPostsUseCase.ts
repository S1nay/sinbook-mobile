import { inject, injectable } from 'inversify';

import { IPagination, IPost } from '@domain/models';
import { IUserRepository, IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class GetPostsUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(params?: GetPostsRequestParams): Promise<IPagination<IPost>> {
    const sessionUser = this.userRepository.getUserSession();

    if (sessionUser?.id === params?.userId) {
      const userPosts = this.postRepository.getLoggedInUserPosts();

      if (!userPosts) {
        const fetchedPosts = await this.postRepository.getPosts(params);

        this.postRepository.setLoggedInUserPosts(fetchedPosts);

        return fetchedPosts;
      } else {
        return userPosts;
      }
    } else {
      const fetchedPosts = await this.postRepository.getPosts(params);

      return fetchedPosts;
    }
  }
}

export default GetPostsUseCase;
