import * as z from 'zod';

import { LoginFormKeys } from './keys';

enum LoginFormErrorMessages {
  INCORRECT_EMAIL = 'Incorrect email format',
  REQUIRED = 'Field is required',
}

export const LoginFormValidationSchema = () =>
  z.object({
    [LoginFormKeys.EMAIL]: z
      .string()
      .nonempty(LoginFormErrorMessages.REQUIRED)
      .email(LoginFormErrorMessages.INCORRECT_EMAIL),
    [LoginFormKeys.PASSWORD]: z.string().nonempty(LoginFormErrorMessages.REQUIRED),
    [LoginFormKeys.IS_REMEMBER_ME]: z.boolean(),
  });
