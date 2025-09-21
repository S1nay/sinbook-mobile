import { inject, injectable, ServiceIdentifier } from 'inversify';

import { IAuthRepository } from '@domain/repositories';

@injectable()
class LogoutUseCase {
  constructor(@inject(IAuthRepository.$) private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    try {
      this.authRepository.removeAccessToken();
      this.authRepository.removeIsRememberMe();
      this.authRepository.removeRefreshToken();
      this.authRepository.removeUserData();
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default LogoutUseCase;

export namespace logoutUseCase {
  export const $: ServiceIdentifier<LogoutUseCase> = Symbol('logoutUseCase');
}
