import { ServiceIdentifier } from 'inversify';

import CreatePostUseCase from './CreatePostUseCase';
import GetPostsByIdsUseCase from './GetPostsByIdsUseCase';
import GetUserPostsUseCase from './GetUserPostsUseCase';
import LikePostUseCase from './LikePostUseCase';
import SearchPostsUseCase from './SearchPostsUseCase';

export {
  CreatePostUseCase,
  GetPostsByIdsUseCase,
  GetUserPostsUseCase,
  LikePostUseCase,
  SearchPostsUseCase,
};

export namespace PostUseCases {
  export const $GetUserPosts: ServiceIdentifier<GetUserPostsUseCase> =
    Symbol('GetUserPostsUseCase');
  export const $CreatePost: ServiceIdentifier<CreatePostUseCase> = Symbol('CreatePostUseCase');
  export const $SearchPosts: ServiceIdentifier<SearchPostsUseCase> = Symbol('SearchPostsUseCase');
  export const $GetPostsByIds: ServiceIdentifier<GetPostsByIdsUseCase> =
    Symbol('GetPostsByIdsUseCase');
  export const $LikePost: ServiceIdentifier<LikePostUseCase> = Symbol('LikePostUseCase');
}
