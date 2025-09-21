import { ServiceIdentifier } from 'inversify';

import LoginUseCase from './LoginUseCase';
import LogoutUseCase from './LogoutUseCase';

export { LoginUseCase, LogoutUseCase };

export namespace AuthUseCases {
  export const $Login: ServiceIdentifier<LoginUseCase> = Symbol('LoginUseCase');
  export const $Logout: ServiceIdentifier<LogoutUseCase> = Symbol('LogoutUseCase');
}
