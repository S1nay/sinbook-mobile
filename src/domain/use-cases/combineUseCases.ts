import { Container } from 'inversify';

import {
  AuthUseCases,
  CheckAuthUseCase,
  LoginUseCase,
  LogoutUseCase,
  RegisterUseCase,
} from './auth';
import { FileUseCases, PostAvatarUseCase } from './file';
import { CreatePostUseCase, GetUserPostsUseCase, PostUseCases } from './post';
import { GetThemeUseCase, SwitchThemeUseCase, ThemeUseCases } from './theme';
import { GetUserUseCase, PatchUserUseCase, UserUseCases } from './user';

export const combineUseCases = (container: Container) => {
  container.bind(AuthUseCases.$CheckAuth).to(CheckAuthUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Login).to(LoginUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Logout).to(LogoutUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Register).to(RegisterUseCase).inSingletonScope();

  container.bind(UserUseCases.$GetUser).to(GetUserUseCase).inSingletonScope();
  container.bind(UserUseCases.$PatchUser).to(PatchUserUseCase).inSingletonScope();

  container.bind(PostUseCases.$GetUserPosts).to(GetUserPostsUseCase).inSingletonScope();
  container.bind(PostUseCases.$CreatePost).to(CreatePostUseCase).inSingletonScope();

  container.bind(FileUseCases.$PostAvatar).to(PostAvatarUseCase).inSingletonScope();

  container.bind(ThemeUseCases.$Switch).to(SwitchThemeUseCase).inSingletonScope();
  container.bind(ThemeUseCases.$Get).to(GetThemeUseCase).inSingletonScope();
};
