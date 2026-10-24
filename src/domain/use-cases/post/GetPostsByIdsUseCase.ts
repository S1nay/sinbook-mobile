import { inject, injectable } from 'inversify';

import { IPost } from '@domain/models';
import { IPostRepository } from '@domain/repositories';

@injectable()
class GetPostsByIdsUseCase {
  constructor(@inject(IPostRepository.$) private postRepository: IPostRepository) {}

  execute(ids: number[]): IPost[] {
    return this.postRepository.getPostsByIds(ids);
  }
}

export default GetPostsByIdsUseCase;
