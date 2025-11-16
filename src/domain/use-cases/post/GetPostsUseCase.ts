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

  async execute(
    params: GetPostsRequestParams & { isRefetching: boolean },
  ): Promise<IPagination<IPost>> {
    const { isRefetching, userId, ...otherParams } = params;
    const sessionUser = this.userRepository.getUserSession();

    if (sessionUser?.id === userId && !isRefetching) {
      const userPosts = this.postRepository.getLoggedInUserPosts();

      if (!userPosts) {
        const fetchedPosts = await this.postRepository.getPosts({ userId, ...otherParams });

        this.postRepository.setLoggedInUserPosts(fetchedPosts);

        return fetchedPosts;
      } else {
        return userPosts;
      }
    } else {
      const fetchedPosts = await this.postRepository.getPosts({ userId, ...otherParams });

      return fetchedPosts;
    }
  }
}

export default GetPostsUseCase;
