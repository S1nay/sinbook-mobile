import { ServiceIdentifier } from 'inversify';

import { LoginFormExternalErrors } from '@components/forms/login-form';

export interface ILoginViewModel {
  isLoading: boolean;
  formErrors: LoginFormExternalErrors | null;
  error: string;
  isSuccess: boolean;
  login: (email: string, password: string, isRememberMe: boolean) => void;
}

export namespace ILoginViewModel {
  export const $: ServiceIdentifier<ILoginViewModel> = Symbol('ILoginViewModel');
}
