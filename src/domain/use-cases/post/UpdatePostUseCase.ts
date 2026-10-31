import { inject, injectable } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { IPost } from '@domain/models';
import { IFileRepository, IPostRepository } from '@domain/repositories';

import { uploadPostImages } from './uploadPostImages';

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IFileRepository.$) private fileRepository: IFileRepository,
  ) {}

  // строка — уже загруженная картинка (url), Asset — новая, её нужно загрузить
  async execute(postId: number, content: string, images: Array<Asset | string>): Promise<IPost> {
    const newAssets = images.filter((image): image is Asset => typeof image !== 'string');
    const uploadedUrls = await uploadPostImages(this.fileRepository, newAssets);

    // сохраняем исходный порядок картинок
    let uploadedIndex = 0;
    const imageUrls = images.map(image =>
      typeof image === 'string' ? image : uploadedUrls[uploadedIndex++],
    );

    return this.postRepository.updatePost(postId, { content, images: imageUrls });
  }
}

export default UpdatePostUseCase;
