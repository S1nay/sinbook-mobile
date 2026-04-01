import { Asset } from 'react-native-image-picker';
import * as z from 'zod';

import { CreatePostFormKeys } from './keys';

const MAX_IMAGES = 10;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const CreatePostFormValidationSchema = () =>
  z.object({
    [CreatePostFormKeys.CONTENT]: z
      .string()
      .nonempty('Field is required')
      .max(100, 'Max 100 characters'),
    [CreatePostFormKeys.IMAGES]: z
      .array(z.custom<Asset>(() => true))
      .max(MAX_IMAGES, `Max ${MAX_IMAGES} images allowed`)
      .refine(
        assets => assets.every(a => !a.fileSize || a.fileSize <= MAX_FILE_SIZE_BYTES),
        'Each image must be under 10 MB',
      ),
  });
