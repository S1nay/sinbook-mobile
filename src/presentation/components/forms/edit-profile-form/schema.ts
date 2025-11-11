import { Asset } from 'react-native-image-picker';
import * as z from 'zod';

import { EditProfileFormKeys } from './keys';

enum EditProfileFormErrorMessages {
  REQUIRED = 'Field is required',
}

export const EditProfileFormValidationSchema = () =>
  z.object({
    [EditProfileFormKeys.AVATAR]: z.string().nullable(),
    [EditProfileFormKeys.AVATAR_BLOB]: z.custom<Asset>().optional(),
    [EditProfileFormKeys.NAME]: z.string().nonempty(EditProfileFormErrorMessages.REQUIRED),
    [EditProfileFormKeys.NICKNAME]: z.string().nonempty(EditProfileFormErrorMessages.REQUIRED),
    [EditProfileFormKeys.BIOGRAPHY]: z.string().nonempty(EditProfileFormErrorMessages.REQUIRED),
  });
