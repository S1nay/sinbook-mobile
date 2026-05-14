import { ServiceIdentifier } from 'inversify';

import CreatePostUseCase from './CreatePostUseCase';
import GetUserPostsUseCase from './GetUserPostsUseCase';
import SearchPostsUseCase from './SearchPostsUseCase';

export { CreatePostUseCase, GetUserPostsUseCase, SearchPostsUseCase };

export namespace PostUseCases {
  export const $GetUserPosts: ServiceIdentifier<GetUserPostsUseCase> =
    Symbol('GetUserPostsUseCase');
  export const $CreatePost: ServiceIdentifier<CreatePostUseCase> = Symbol('CreatePostUseCase');
  export const $SearchPosts: ServiceIdentifier<SearchPostsUseCase> = Symbol('SearchPostsUseCase');
}
