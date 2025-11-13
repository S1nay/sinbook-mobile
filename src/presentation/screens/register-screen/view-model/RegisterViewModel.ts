import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { RegisterFormData, RegisterFormExternalErrors } from '@components/forms/register-form';
import { transformHttpFieldErrors } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { AuthUseCases } from '@domain/use-cases';

import { IRegisterViewModel } from './IRegisterViewModel';

@injectable()
class RegisterViewModel implements IRegisterViewModel {
  private _isLoading: boolean = false;
  private _formErrors: RegisterFormExternalErrors | null = null;
  private _error: string = '';
  private _isSuccess: boolean = false;

  constructor(
    @inject(AuthUseCases.$Register) private registerUseCase: UseCase<RegisterFormData, boolean>,
  ) {
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

  private set isSuccess(value: boolean) {
    this._isSuccess = value;
  }

  private set formErrors(value: RegisterFormExternalErrors | null) {
    this._formErrors = value;
  }

  private set error(value: string) {
    this._error = value;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  register(data: RegisterFormData) {
    this.isLoading = true;
    this.formErrors = null;
    this.error = '';

    this.registerUseCase
      .execute(data)
      .then(() => {
        this.isSuccess = true;
      })
      .catch(({ message }: IHttpError) => {
        if (Array.isArray(message)) {
          this.formErrors = transformHttpFieldErrors<RegisterFormExternalErrors>(message);
        } else {
          this.error = message;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default RegisterViewModel;
