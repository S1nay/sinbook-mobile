import { Container } from 'inversify';

import { AuthUseCases, LoginUseCase, LogoutUseCase } from './auth';

export const combineUseCases = (container: Container) => {
  container.bind(AuthUseCases.$Login).to(LoginUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Logout).to(LogoutUseCase).inSingletonScope();
};
