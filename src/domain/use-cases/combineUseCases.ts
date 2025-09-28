import { Container } from 'inversify';

import { AuthUseCases, LoginUseCase, LogoutUseCase } from './auth';
import RegisterUseCase from './auth/RegisterUseCase';

export const combineUseCases = (container: Container) => {
  container.bind(AuthUseCases.$Login).to(LoginUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Logout).to(LogoutUseCase).inSingletonScope();
  container.bind(AuthUseCases.$Register).to(RegisterUseCase).inSingletonScope();
};
