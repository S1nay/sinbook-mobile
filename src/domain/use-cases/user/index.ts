import { ServiceIdentifier } from 'inversify';

import GetCurrentUserUseCase from './GetCurrentUserUseCase';
import GetUserByIdUseCase from './GetUserByIdUseCase';
import PatchUserUseCase from './PatchUserUseCase';
import SearchUsersUseCase from './SearchUsersUseCase';

export { GetCurrentUserUseCase, GetUserByIdUseCase, PatchUserUseCase, SearchUsersUseCase };

export namespace UserUseCases {
  export const $GetCurrentUser: ServiceIdentifier<GetCurrentUserUseCase> =
    Symbol('GetCurrentUserUseCase');
  export const $GetUserById: ServiceIdentifier<GetUserByIdUseCase> = Symbol('GetUserByIdUseCase');
  export const $PatchUser: ServiceIdentifier<PatchUserUseCase> = Symbol('PatchUserUseCase');
  export const $SearchUsers: ServiceIdentifier<SearchUsersUseCase> = Symbol('SearchUsersUseCase');
}
