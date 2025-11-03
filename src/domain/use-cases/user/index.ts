import { ServiceIdentifier } from 'inversify';

import GetUserUseCase from './GetUserUseCase';

export { GetUserUseCase };

export namespace UserUseCases {
  export const $GetUser: ServiceIdentifier<GetUserUseCase> = Symbol('GetUserUseCase');
}
