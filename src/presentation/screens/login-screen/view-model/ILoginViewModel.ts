import { ServiceIdentifier } from 'inversify';

import { LoginFormData, LoginFormExternalErrors } from '@components/forms/login-form';

export interface ILoginViewModel {
  isLoading: boolean;
  formErrors: LoginFormExternalErrors | null;
  error: string;
  isSuccess: boolean;
  login: (data: LoginFormData) => void;
}

export namespace ILoginViewModel {
  export const $: ServiceIdentifier<ILoginViewModel> = Symbol('ILoginViewModel');
}
