import { inject, injectable } from 'inversify';

import { ILoginRequestDTO } from '@domain/dto';
import { IAuthRepository, IUserRepository } from '@domain/repositories';

@injectable()
class LoginUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(signInDto: ILoginRequestDTO): Promise<boolean> {
    const { access, refresh, user } = await this.authRepository.login(signInDto);

    this.authRepository.saveTokensToStorage(access, refresh);
    this.userRepository.persistUser(user);

    return true;
  }
}

export default LoginUseCase;
