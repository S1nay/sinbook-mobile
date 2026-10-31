import { RefObject } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { PostFormValidationSchema } from '../schema';

export type PostFormData = z.infer<ReturnType<typeof PostFormValidationSchema>>;

export type PostFormRef = UseFormReturn<PostFormData, unknown, PostFormData>;

export type PostFormKeysType = keyof PostFormData;

export interface PostFormProps {
  formParams: UseFormProps<PostFormData, unknown, PostFormData>;
  ref: RefObject<PostFormRef | null>;
}
