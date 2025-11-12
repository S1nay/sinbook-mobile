import { RefObject } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import * as z from 'zod';

import { EditProfileFormValidationSchema } from '../schema';

export type EditProfileFormData = z.infer<ReturnType<typeof EditProfileFormValidationSchema>>;

export type EditProfileFormRef = UseFormReturn<EditProfileFormData, unknown, EditProfileFormData>;

export type EditProfileFormKeysType = keyof EditProfileFormData;

export type EditProfileFormExternalErrors = { [key in keyof EditProfileFormData]?: string };

export interface EditProfileFormProps {
  formParams: UseFormProps<EditProfileFormData, unknown, EditProfileFormData>;
  externalErrors?: EditProfileFormExternalErrors | null;
  formStyle?: StyleProp<ViewStyle>;
  ref: RefObject<EditProfileFormRef | null>;
}
