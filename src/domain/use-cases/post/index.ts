import { ServiceIdentifier } from 'inversify';

import CreatePostUseCase from './CreatePostUseCase';
import DeletePostUseCase from './DeletePostUseCase';
import GetUserPostsUseCase from './GetUserPostsUseCase';
import LikePostUseCase from './LikePostUseCase';
import SearchPostsUseCase from './SearchPostsUseCase';
import UpdatePostUseCase from './UpdatePostUseCase';

export {
  CreatePostUseCase,
  DeletePostUseCase,
  GetUserPostsUseCase,
  LikePostUseCase,
  SearchPostsUseCase,
  UpdatePostUseCase,
};

export namespace PostUseCases {
  export const $GetUserPosts: ServiceIdentifier<GetUserPostsUseCase> =
    Symbol('GetUserPostsUseCase');
  export const $CreatePost: ServiceIdentifier<CreatePostUseCase> = Symbol('CreatePostUseCase');
  export const $SearchPosts: ServiceIdentifier<SearchPostsUseCase> = Symbol('SearchPostsUseCase');
  export const $LikePost: ServiceIdentifier<LikePostUseCase> = Symbol('LikePostUseCase');
  export const $UpdatePost: ServiceIdentifier<UpdatePostUseCase> = Symbol('UpdatePostUseCase');
  export const $DeletePost: ServiceIdentifier<DeletePostUseCase> = Symbol('DeletePostUseCase');
}
