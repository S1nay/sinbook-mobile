import { Container } from 'inversify';

import { AuthUseCases, LoginUseCase, LogoutUseCase, RegisterUseCase } from './auth';
import { FileUseCases, PostAvatarUseCase } from './file';
import { GetUserPostsUseCase, PostUseCases } from './post';
import { GetUserUseCase, PatchUserUseCase, UserUseCases } from './user';

export const combineUseCases = (container: Container) => {
  container.bind(AuthUseCases.$Login).to(LoginUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Logout).to(LogoutUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Register).to(RegisterUseCase).inSingletonScope();

  container.bind(UserUseCases.$GetUser).to(GetUserUseCase).inSingletonScope();
  container.bind(UserUseCases.$PatchUser).to(PatchUserUseCase).inSingletonScope();

  container.bind(PostUseCases.$GetUserPosts).to(GetUserPostsUseCase).inSingletonScope();

  container.bind(FileUseCases.$PostAvatar).to(PostAvatarUseCase).inSingletonScope();
};
