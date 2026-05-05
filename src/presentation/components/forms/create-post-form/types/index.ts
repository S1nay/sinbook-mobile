import { RefObject } from 'react';
import { UseFormProps, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { CreatePostFormValidationSchema } from '../schema';

export type CreatePostFormData = z.infer<ReturnType<typeof CreatePostFormValidationSchema>>;

export type CreatePostFormRef = UseFormReturn<CreatePostFormData, unknown, CreatePostFormData>;

export type CreatePostFormKeysType = keyof CreatePostFormData;

export interface CreatePostFormProps {
  formParams: UseFormProps<CreatePostFormData, unknown, CreatePostFormData>;
  ref: RefObject<CreatePostFormRef | null>;
}
