import { inject, injectable } from 'inversify';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IPagination, IPost } from '@domain/models';
import { IUserRepository, IPostRepository } from '@domain/repositories';
import { GetPostsRequestParams } from '@domain/request-params';

export type GetPostsMode = 'initial' | 'post-created' | 'pagination' | 'refetch';

@injectable()
class GetUserPostsUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(
    params: GetPostsRequestParams & { mode: GetPostsMode },
  ): Promise<IPagination<IPost>> {
    const { mode, userId, ...otherParams } = params;

    const sessionUser = this.userRepository.getUserSession();
    const isOwnProfile = Boolean(sessionUser && userId && sessionUser.id === userId);

    switch (mode) {
      case 'initial': {
        if (isOwnProfile) {
          const cached = this.postRepository.getLoggedInUserPosts();
          if (cached) return cached;
          const posts = await this.postRepository.getPosts({ userId, ...otherParams });
          this.postRepository.setLoggedInUserPosts(posts);
          return posts;
        }
        return this.postRepository.getPosts({ userId, ...otherParams });
      }

      case 'post-created': {
        if (isOwnProfile) {
          const cached = this.postRepository.getLoggedInUserPosts();
          if (cached) return cached;
        }
        return this.postRepository.getPosts({ userId, ...otherParams });
      }

      case 'refetch': {
        const posts = await this.postRepository.getPosts({ userId, ...otherParams });
        if (isOwnProfile) this.postRepository.setLoggedInUserPosts(posts);
        return posts;
      }

      case 'pagination': {
        const posts = await this.postRepository.getPosts({ userId, ...otherParams });
        if (isOwnProfile) {
          const cached = this.postRepository.getLoggedInUserPosts();
          const mergedResults = mergeArraysWithoutDuplicates(
            cached?.results || [],
            posts.results,
            'id',
          );
          const merged: IPagination<IPost> = { ...posts, results: mergedResults };
          this.postRepository.setLoggedInUserPosts(merged);
          return merged;
        }
        return posts;
      }
    }
  }
}

export default GetUserPostsUseCase;
