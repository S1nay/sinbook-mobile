import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { LoginFormData, LoginFormExternalErrors } from '@components/forms/login-form';
import { Identifiers } from '@core/di/identifiers';
import { transformHttpFieldErrors } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { AuthUseCases } from '@domain/use-cases';
import { AppRouteNames, RootStackParamList } from '@navigation/configuration';

import { ILoginViewModel } from './ILoginViewModel';

@injectable()
class LoginViewModel implements ILoginViewModel {
  private _isLoading: boolean = false;
  private _formErrors: LoginFormExternalErrors | null = null;
  private _error: string = '';

  constructor(
    @inject(AuthUseCases.$Login) private loginUseCase: UseCase<LoginFormData, boolean>,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<RootStackParamList>,
  ) {
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
        this.navigationService.reset({
          index: 0,
          routes: [{ name: AppRouteNames.Maintenance }],
        });
      })
      .catch(({ message }: IHttpError) => {
        if (Array.isArray(message)) {
          this.formErrors = transformHttpFieldErrors<LoginFormExternalErrors>(message);
        } else {
          this.error = message;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default LoginViewModel;
