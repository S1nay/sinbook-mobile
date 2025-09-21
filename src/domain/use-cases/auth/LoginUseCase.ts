import { inject, injectable, ServiceIdentifier } from 'inversify';

import { ILoginRequestDTO } from '@domain/dto';
import { IAuthRepository } from '@domain/repositories';

@injectable()
class LoginUseCase {
  constructor(@inject(IAuthRepository.$) private authRepository: IAuthRepository) {}

  async execute(signInDto: ILoginRequestDTO, isRememberMe: boolean): Promise<boolean> {
    const response = await this.authRepository.login(signInDto);

    const { user, access, refresh } = response;

    this.authRepository.saveAccessToken(access);
    this.authRepository.saveRefreshToken(refresh);
    this.authRepository.saveUserData(user);

    if (isRememberMe) {
      this.authRepository.setIsRememberMe(true);
    }

    return true;
  }
}

export default LoginUseCase;

export namespace loginUseCase {
  export const $: ServiceIdentifier<LoginUseCase> = Symbol('loginUseCase');
}
