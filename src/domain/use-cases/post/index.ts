import { ServiceIdentifier } from 'inversify';

import CreatePostUseCase from './CreatePostUseCase';
import GetUserPostsUseCase from './GetUserPostsUseCase';

export { CreatePostUseCase, GetUserPostsUseCase };
export type { GetPostsMode } from './GetUserPostsUseCase';

export namespace PostUseCases {
  export const $GetUserPosts: ServiceIdentifier<GetUserPostsUseCase> =
    Symbol('GetUserPostsUseCase');
  export const $CreatePost: ServiceIdentifier<CreatePostUseCase> = Symbol('CreatePostUseCase');
}
