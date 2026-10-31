import { inject, injectable } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { IPost } from '@domain/models';
import { IFileRepository, IPostRepository } from '@domain/repositories';

import { uploadPostImages } from './uploadPostImages';

@injectable()
class CreatePostUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IFileRepository.$) private fileRepository: IFileRepository,
  ) {}

  async execute(content: string, images: Asset[]): Promise<IPost> {
    const imageUrls = await uploadPostImages(this.fileRepository, images);

    return this.postRepository.createPost({ content, images: imageUrls });
  }
}

export default CreatePostUseCase;
