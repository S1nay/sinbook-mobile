import * as z from 'zod';

import { RegisterFormKeys } from './keys';

enum RegisterFormErrorMessages {
  INCORRECT_EMAIL = 'Incorrect email format',
  REQUIRED = 'Field is required',
  MIN = 'Password must contain at least 8 characters',
  MAX = 'Password must contain no more than 64 characters',
}

export const RegisterFormValidationSchema = () =>
  z.object({
    [RegisterFormKeys.EMAIL]: z
      .string()
      .nonempty(RegisterFormErrorMessages.REQUIRED)
      .email(RegisterFormErrorMessages.INCORRECT_EMAIL),
    [RegisterFormKeys.PASSWORD]: z
      .string()
      .nonempty(RegisterFormErrorMessages.REQUIRED)
      .min(8, RegisterFormErrorMessages.MIN)
      .max(64, RegisterFormErrorMessages.MAX),
    [RegisterFormKeys.NAME]: z.string().nonempty(RegisterFormErrorMessages.REQUIRED),
    [RegisterFormKeys.NICKNAME]: z.string().nonempty(RegisterFormErrorMessages.REQUIRED),
    [RegisterFormKeys.BIOGRAPHY]: z.string().nonempty(RegisterFormErrorMessages.REQUIRED),
  });
