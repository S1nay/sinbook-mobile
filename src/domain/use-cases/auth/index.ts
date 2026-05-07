import { ServiceIdentifier } from 'inversify';

import CheckAuthUseCase from './CheckAuthUseCase';
import LoginUseCase from './LoginUseCase';
import LogoutUseCase from './LogoutUseCase';
import RegisterUseCase from './RegisterUseCase';

export { CheckAuthUseCase, LoginUseCase, LogoutUseCase, RegisterUseCase };

export namespace AuthUseCases {
  export const $CheckAuth: ServiceIdentifier<CheckAuthUseCase> = Symbol('CheckAuthUseCase');
  export const $Login: ServiceIdentifier<LoginUseCase> = Symbol('LoginUseCase');
  export const $Register: ServiceIdentifier<RegisterUseCase> = Symbol('RegisterUseCase');
  export const $Logout: ServiceIdentifier<LogoutUseCase> = Symbol('LogoutUseCase');
}
