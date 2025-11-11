import { inject, injectable } from 'inversify';

import { IPatchUserRequestDto } from '@domain/dto';
import { IUserRepository } from '@domain/repositories';

@injectable()
class PatchUserUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(dto: Partial<IPatchUserRequestDto>): Promise<boolean> {
    const user = await this.userRepository.patchUser(dto);

    if (user) {
      this.userRepository.saveUserInStorage(user);
      this.userRepository.setUserToStore(user);
    }

    return true;
  }
}

export default PatchUserUseCase;
