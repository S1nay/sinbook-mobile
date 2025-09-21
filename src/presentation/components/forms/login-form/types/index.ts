import { RefObject } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import * as z from 'zod';

import { LoginFormValidationSchema } from '../schema';

export type LoginFormData = z.infer<ReturnType<typeof LoginFormValidationSchema>>;

export type LoginFormRef = UseFormReturn<LoginFormData, unknown, LoginFormData>;

export type LoginFormKeysType = keyof LoginFormData;

export type LoginFormExternalErrors = { [key in keyof LoginFormData]?: string };

export interface LoginFormProps {
  formParams: UseFormProps<LoginFormData, unknown, LoginFormData>;
  externalErrors: LoginFormExternalErrors | null;
  formStyle?: StyleProp<ViewStyle>;
  ref: RefObject<LoginFormRef | null>;
}
