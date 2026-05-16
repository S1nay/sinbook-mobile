import { inject, injectable } from 'inversify';

import { IAuthRepository, IUserRepository } from '@domain/repositories';

@injectable()
class LogoutUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<boolean> {
    this.authRepository.removeTokensFromStorage();
    this.userRepository.clearPersistedUser();
    this.userRepository.clearUserSession();

    return true;
  }
}

export default LogoutUseCase;
