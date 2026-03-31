import { ServiceIdentifier } from 'inversify';

import GetUserPostsUseCase from './GetUserPostsUseCase';

export { GetUserPostsUseCase };

export namespace PostUseCases {
  export const $GetUserPosts: ServiceIdentifier<GetUserPostsUseCase> =
    Symbol('GetUserPostsUseCase');
}
