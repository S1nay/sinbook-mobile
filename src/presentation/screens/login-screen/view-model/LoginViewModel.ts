import { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { LoginFormData, LoginFormExternalErrors } from '@components/forms/login-form';
import { transformHttpFieldErrors } from '@core/helpers';
import { AuthUseCases } from '@domain/use-cases';
import { IHttpError } from '@infrastructure/http/entities';

import { ILoginViewModel } from './ILoginViewModel';

@injectable()
class LoginViewModel implements ILoginViewModel {
  private _isLoading: boolean = false;
  private _formErrors: LoginFormExternalErrors | null = null;
  private _error: string = '';
  private _isSuccess: boolean = false;

  constructor(@inject(AuthUseCases.$Login) private loginUseCase: UseCase<LoginFormData, boolean>) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get formErrors(): LoginFormExternalErrors | null {
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

  private set formErrors(value: LoginFormExternalErrors | null) {
    this._formErrors = value;
  }

  private set error(value: string) {
    this._error = value;
  }

  private set isLoading(value: boolean) {
    this._isLoading = value;
  }

  login(data: LoginFormData) {
    this.isLoading = true;
    this.formErrors = null;
    this.error = '';

    this.loginUseCase
      .execute(data)
      .then(() => {
        this.isSuccess = true;
      })
      .catch(({ response }: AxiosError<IHttpError>) => {
        if (response) {
          const { data } = response;

          if (Array.isArray(data.message)) {
            this.formErrors = transformHttpFieldErrors<LoginFormExternalErrors>(data.message);
          } else {
            this.error = data.message;
          }
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default LoginViewModel;
