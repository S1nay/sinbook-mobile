import { inject, injectable, ServiceIdentifier } from 'inversify';

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
    this.userRepository.saveUserInStorage(user);
    this.userRepository.setUserToStore(user);

    return true;
  }
}

export default LoginUseCase;

export namespace loginUseCase {
  export const $: ServiceIdentifier<LoginUseCase> = Symbol('loginUseCase');
}
