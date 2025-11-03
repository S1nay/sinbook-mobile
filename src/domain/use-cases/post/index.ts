import { ServiceIdentifier } from 'inversify';

import GetPostsUseCase from './GetPostsUseCase';

export { GetPostsUseCase };

export namespace PostUseCases {
  export const $GetPosts: ServiceIdentifier<GetPostsUseCase> = Symbol('GetPostsUseCase');
}
