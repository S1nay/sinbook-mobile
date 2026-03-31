import { inject, injectable } from 'inversify';

import { IRegisterRequestDTO } from '@domain/dto';
import { IAuthRepository, IUserRepository } from '@domain/repositories';

@injectable()
class RegisterUseCase {
  constructor(
    @inject(IAuthRepository.$) private authRepository: IAuthRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(signUpDto: IRegisterRequestDTO): Promise<boolean> {
    const { access, refresh, user } = await this.authRepository.register(signUpDto);

    this.authRepository.saveTokensToStorage(access, refresh);
    this.userRepository.persistUser(user);

    return true;
  }
}

export default RegisterUseCase;
