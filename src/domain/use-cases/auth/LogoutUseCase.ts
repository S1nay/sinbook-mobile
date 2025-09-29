import { inject, injectable, ServiceIdentifier } from 'inversify';

import { IAuthRepository, IUserRepository } from '@domain/repositories';

@injectable()
class LogoutUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<void> {
    try {
      this.authRepository.removeTokensFromStorage();
      this.userRepository.removeUserFromStorage();
      this.userRepository.removeUserFromStore();
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default LogoutUseCase;

export namespace logoutUseCase {
  export const $: ServiceIdentifier<LogoutUseCase> = Symbol('logoutUseCase');
}
