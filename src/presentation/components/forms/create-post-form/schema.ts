import { Asset } from 'react-native-image-picker';
import * as z from 'zod';

import { CreatePostFormKeys } from './keys';

const _MAX_IMAGES = 10;
const _MAX_SYMBOLS = 100;
const _MAX_FILE_SIZE_MB = 10;

enum CreatePostErrorMessages {
  REQUIRED = 'Field is required',
  MAX_SIZE = `Each image must be under ${_MAX_FILE_SIZE_MB} MB`,
  MAX_SYMBOLS = `Content must be under ${_MAX_SYMBOLS} characters`,
  MAX_IMAGES = `You can upload up to ${_MAX_IMAGES} images`,
}

const MAX_FILE_SIZE_BYTES = _MAX_FILE_SIZE_MB * 1024 * 1024;

export const CreatePostFormValidationSchema = () =>
  z.object({
    [CreatePostFormKeys.CONTENT]: z
      .string()
      .nonempty(CreatePostErrorMessages.REQUIRED)
      .max(100, { message: CreatePostErrorMessages.MAX_SYMBOLS }),
    [CreatePostFormKeys.IMAGES]: z
      .array(z.custom<Asset>(() => true))
      .max(_MAX_IMAGES, { message: CreatePostErrorMessages.MAX_IMAGES })
      .refine(assets => assets.every(a => !a.fileSize || a.fileSize <= MAX_FILE_SIZE_BYTES), {
        message: CreatePostErrorMessages.MAX_SIZE,
      }),
  });
