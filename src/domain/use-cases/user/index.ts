import { ServiceIdentifier } from 'inversify';

import GetCurrentUserUseCase from './GetCurrentUserUseCase';
import GetUserByIdUseCase from './GetUserByIdUseCase';
import PatchUserUseCase from './PatchUserUseCase';

export { GetCurrentUserUseCase, GetUserByIdUseCase, PatchUserUseCase };

export namespace UserUseCases {
  export const $GetCurrentUser: ServiceIdentifier<GetCurrentUserUseCase> =
    Symbol('GetCurrentUserUseCase');
  export const $GetUserById: ServiceIdentifier<GetUserByIdUseCase> = Symbol('GetUserByIdUseCase');
  export const $PatchUser: ServiceIdentifier<PatchUserUseCase> = Symbol('PatchUserUseCase');
}
