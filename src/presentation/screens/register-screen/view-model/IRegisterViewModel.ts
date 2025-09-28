import { ServiceIdentifier } from 'inversify';

import { RegisterFormData, RegisterFormExternalErrors } from '@components/forms/register-form';

export interface IRegisterViewModel {
  isLoading: boolean;
  formErrors: RegisterFormExternalErrors | null;
  error: string;
  isSuccess: boolean;
  register: (data: RegisterFormData) => void;
}

export namespace IRegisterViewModel {
  export const $: ServiceIdentifier<IRegisterViewModel> = Symbol('IRegisterViewModel');
}
