import { Asset } from 'react-native-image-picker';
import * as z from 'zod';

import { PostFormKeys } from './keys';

const _MAX_IMAGES = 10;
const _MAX_SYMBOLS = 100;
const _MAX_FILE_SIZE_MB = 10;

enum PostFormErrorMessages {
  REQUIRED = 'Field is required',
  MAX_SIZE = `Each image must be under ${_MAX_FILE_SIZE_MB} MB`,
  MAX_SYMBOLS = `Content must be under ${_MAX_SYMBOLS} characters`,
  MAX_IMAGES = `You can upload up to ${_MAX_IMAGES} images`,
  IMAGES_REQUIRED = 'Required 1 image minimum',
}

const MAX_FILE_SIZE_BYTES = _MAX_FILE_SIZE_MB * 1024 * 1024;

export const PostFormValidationSchema = () =>
  z.object({
    [PostFormKeys.CONTENT]: z
      .string()
      .nonempty(PostFormErrorMessages.REQUIRED)
      .max(100, { message: PostFormErrorMessages.MAX_SYMBOLS }),
    [PostFormKeys.IMAGES]: z
      .array(z.custom<Asset>(() => true))
      .min(1, { message: PostFormErrorMessages.IMAGES_REQUIRED })
      .max(_MAX_IMAGES, { message: PostFormErrorMessages.MAX_IMAGES })
      .refine(assets => assets.every(a => !a.fileSize || a.fileSize <= MAX_FILE_SIZE_BYTES), {
        message: PostFormErrorMessages.MAX_SIZE,
      }),
  });
