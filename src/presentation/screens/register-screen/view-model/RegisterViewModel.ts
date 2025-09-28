import { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { RegisterFormData, RegisterFormExternalErrors } from '@components/forms/register-form';
import { transformHttpFieldErrors } from '@core/helpers';
import { AuthUseCases } from '@domain/use-cases';
import { IHttpError } from '@infrastructure/http/entities';

import { IRegisterViewModel } from './IRegisterViewModel';

@injectable()
class RegisterViewModel implements IRegisterViewModel {
  private _isLoading: boolean = false;
  private _formErrors: RegisterFormExternalErrors | null = null;
  private _error: string = '';
  private _isSuccess: boolean = false;

  constructor(@inject(AuthUseCases.$Register) private registerUseCase: UseCase) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
  get formErrors(): RegisterFormExternalErrors | null {
    return this._formErrors;
  }
  get error(): string {
    return this._error;
  }
  get isSuccess(): boolean {
    return this._isSuccess;
  }

  register(data: RegisterFormData) {
    this._isLoading = true;
    this._formErrors = null;
    this._error = '';

    this.registerUseCase
      .execute(data)
      .then(() => {
        this._isSuccess = true;
      })
      .catch(({ response }: AxiosError<IHttpError>) => {
        if (response) {
          const { data } = response;

          if (Array.isArray(data.message)) {
            this._formErrors = transformHttpFieldErrors<RegisterFormExternalErrors>(data.message);
          } else {
            this._error = data.message;
          }
        }
      })
      .finally(() => {
        this._isLoading = false;
      });
  }
}

export default RegisterViewModel;
