import { inject, injectable, ServiceIdentifier } from 'inversify';

import { IRegisterRequestDTO } from '@domain/dto';
import { IAuthRepository } from '@domain/repositories';

@injectable()
class RegisterUseCase {
  constructor(@inject(IAuthRepository.$) private authRepository: IAuthRepository) {}

  async execute(signUpDto: IRegisterRequestDTO): Promise<boolean> {
    const response = await this.authRepository.register(signUpDto);

    const { user, access, refresh } = response;

    this.authRepository.saveAccessToken(access);
    this.authRepository.saveRefreshToken(refresh);
    this.authRepository.saveUserData(user);
    this.authRepository.setIsRememberMe(true);

    return true;
  }
}

export default RegisterUseCase;

export namespace registerUseCase {
  export const $: ServiceIdentifier<RegisterUseCase> = Symbol('registerUseCase');
}
