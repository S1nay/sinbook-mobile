import { Container } from 'inversify';

import { AuthUseCases, LoginUseCase, LogoutUseCase, RegisterUseCase } from './auth';
import { GetPostsUseCase, PostUseCases } from './post';
import { GetUserUseCase, UserUseCases } from './user';

export const combineUseCases = (container: Container) => {
  container.bind(AuthUseCases.$Login).to(LoginUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Logout).to(LogoutUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Register).to(RegisterUseCase).inSingletonScope();

  container.bind(UserUseCases.$GetUser).to(GetUserUseCase).inSingletonScope();

  container.bind(PostUseCases.$GetPosts).to(GetPostsUseCase).inSingletonScope();
};
