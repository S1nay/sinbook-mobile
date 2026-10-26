import { inject, injectable } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { IPost } from '@domain/models';
import { IFileRepository, IPostRepository } from '@domain/repositories';

@injectable()
class CreatePostUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IFileRepository.$) private fileRepository: IFileRepository,
  ) {}

  async execute(content: string, images: Asset[]): Promise<IPost> {
    let imageUrls: string[] = [];

    if (images.length > 0) {
      const formData = new FormData();

      images.forEach(image => {
        formData.append('image', {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      const files = await this.fileRepository.postPostImages(formData, {});
      imageUrls = files.map(f => f.url);
    }

    return this.postRepository.createPost({ content, images: imageUrls });
  }
}

export default CreatePostUseCase;
