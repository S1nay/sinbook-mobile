import { inject, injectable } from 'inversify';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IPagination, IPost } from '@domain/models';
import { IUserRepository, IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

@injectable()
class GetUserPostsUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(
    params: GetPostsRequestParams & { isRefetching: boolean; isPagination?: boolean },
  ): Promise<IPagination<IPost>> {
    const { isRefetching, isPagination, userId, ...otherParams } = params;

    const sessionUser = this.userRepository.getUserSession();
    const isOwnProfile = Boolean(sessionUser && userId && sessionUser.id === userId);

    if (isOwnProfile && !isRefetching && !isPagination) {
      const cachedPosts = this.postRepository.getLoggedInUserPosts();
      if (cachedPosts) {
        return cachedPosts;
      }
    }

    const fetchedPosts = await this.postRepository.getPosts({ userId, ...otherParams });

    if (isOwnProfile) {
      if (isPagination) {
        const cachedPosts = this.postRepository.getLoggedInUserPosts();

        const mergedResults = mergeArraysWithoutDuplicates(
          cachedPosts?.results || [],
          fetchedPosts.results,
          'id',
        );

        const mergedPosts: IPagination<IPost> = {
          ...fetchedPosts,
          results: mergedResults,
        };

        this.postRepository.setLoggedInUserPosts(mergedPosts);
        return mergedPosts;
      } else {
        this.postRepository.setLoggedInUserPosts(fetchedPosts);
        return fetchedPosts;
      }
    }

    return fetchedPosts;
  }
}

export default GetUserPostsUseCase;
