import { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { LoginFormExternalErrors } from '@components/forms/login-form';
import { transformHttpFieldErrors } from '@core/helpers';
import { AuthUseCases } from '@domain/use-cases';
import { IHttpError } from '@infrastructure/http/entities';

import { ILoginViewModel } from './ILoginViewModel';

@injectable()
class LoginViewModelImpl implements ILoginViewModel {
  private _isLoading: boolean = false;
  private _formErrors: LoginFormExternalErrors | null = null;
  private _error: string = '';
  private _isSuccess: boolean = false;

  constructor(@inject(AuthUseCases.$Login) private loginUseCase: UseCase) {
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

  login(email: string, password: string, isRememberMe: boolean) {
    this._isLoading = true;
    this._formErrors = null;
    this._error = '';

    this.loginUseCase
      .execute({ email, password }, isRememberMe)
      .then(() => {
        this._isSuccess = true;
      })
      .catch(({ response }: AxiosError<IHttpError>) => {
        if (response) {
          const { data } = response;

          if (Array.isArray(data.message)) {
            this._formErrors = transformHttpFieldErrors<LoginFormExternalErrors>(data.message);
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

export default LoginViewModelImpl;
