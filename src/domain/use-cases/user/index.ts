import { ServiceIdentifier } from 'inversify';

import GetUserUseCase from './GetUserUseCase';
import PatchUserUseCase from './PatchUserUseCase';

export { GetUserUseCase, PatchUserUseCase };

export namespace UserUseCases {
  export const $GetUser: ServiceIdentifier<GetUserUseCase> = Symbol('GetUserUseCase');
  export const $PatchUser: ServiceIdentifier<PatchUserUseCase> = Symbol('PatchUserUseCase');
}
