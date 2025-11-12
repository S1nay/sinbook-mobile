import { inject, injectable } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { IFile } from '@domain/models';
import { IFileRepository } from '@domain/repositories';

@injectable()
class PostAvatarUseCase {
  constructor(@inject(IFileRepository.$) private fileRepository: IFileRepository) {}

  async execute(image: Asset): Promise<IFile> {
    const formData = new FormData();

    formData.append('avatar', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    const avatar = await this.fileRepository.postAvatar(formData);

    return avatar;
  }
}

export default PostAvatarUseCase;
