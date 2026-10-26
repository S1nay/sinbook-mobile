import { inject, injectable } from 'inversify';

import { IPost } from '@domain/models';
import { ILikeRepository } from '@domain/repositories';

@injectable()
class LikePostUseCase {
  constructor(@inject(ILikeRepository.$) private likeRepository: ILikeRepository) {}

  async execute(postId: number): Promise<IPost> {
    return this.likeRepository.likePost({ postId });
  }
}

export default LikePostUseCase;
