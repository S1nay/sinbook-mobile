import { ServiceIdentifier } from 'inversify';

import PostAvatarUseCase from './PostAvatarUseCase';

export { PostAvatarUseCase };

export namespace FileUseCases {
  export const $PostAvatar: ServiceIdentifier<PostAvatarUseCase> = Symbol('PostAvatarUseCase');
}
