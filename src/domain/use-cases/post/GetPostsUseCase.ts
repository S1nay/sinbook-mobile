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
    params: GetPostsRequestParams & { isRefetching: boolean; isPagination?: boolean },
  ): Promise<IPagination<IPost>> {
    const { isRefetching, userId, isPagination, ...otherParams } = params;
    const sessionUser = this.userRepository.getUserSession();

    const isOwnProfile = Boolean(sessionUser && userId && sessionUser.id === userId);

    if (isOwnProfile && !isRefetching && !isPagination) {
      const cachedPosts = this.postRepository.getLoggedInUserPosts();
      if (cachedPosts) return cachedPosts;
    }

    const fetchedPosts = await this.postRepository.getPosts({ userId, ...otherParams });

    if (isOwnProfile) {
      if (isPagination) {
        const cachedPosts = this.postRepository.getLoggedInUserPosts();

        this.postRepository.setLoggedInUserPosts({
          ...fetchedPosts,
          results: [...(cachedPosts?.results || []), ...fetchedPosts.results],
        });
      } else {
        this.postRepository.setLoggedInUserPosts(fetchedPosts);
      }
    }

    return fetchedPosts;
  }
}

export default GetPostsUseCase;
