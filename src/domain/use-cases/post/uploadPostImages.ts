import { Asset } from 'react-native-image-picker';

import { IFileRepository } from '@domain/repositories';

export const uploadPostImages = async (
  fileRepository: IFileRepository,
  images: Asset[],
): Promise<string[]> => {
  if (images.length === 0) return [];

  const formData = new FormData();

  images.forEach(image => {
    formData.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
  });

  const files = await fileRepository.postPostImages(formData, {});
  return files.map(f => f.url);
};
