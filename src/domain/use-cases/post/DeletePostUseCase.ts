import { inject, injectable } from 'inversify';

import { IPostRepository } from '@domain/repositories';

@injectable()
class DeletePostUseCase {
  constructor(@inject(IPostRepository.$) private postRepository: IPostRepository) {}

  async execute(postId: number): Promise<void> {
    return this.postRepository.deletePost(postId);
  }
}

export default DeletePostUseCase;
