import { RefObject } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import * as z from 'zod';

import { RegisterFormValidationSchema } from '../schema';

export type RegisterFormData = z.infer<ReturnType<typeof RegisterFormValidationSchema>>;

export type RegisterFormRef = UseFormReturn<RegisterFormData, unknown, RegisterFormData>;

export type RegisterFormKeysType = keyof RegisterFormData;

export type RegisterFormExternalErrors = { [key in keyof RegisterFormData]?: string };

export interface RegisterFormProps {
  formParams: UseFormProps<RegisterFormData, unknown, RegisterFormData>;
  externalErrors: RegisterFormExternalErrors | null;
  formStyle?: StyleProp<ViewStyle>;
  ref: RefObject<RegisterFormRef | null>;
}
