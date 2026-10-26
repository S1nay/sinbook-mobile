import { inject, injectable } from 'inversify';

import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class GetCurrentUserUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(): Promise<IUser> {
    const storageUser = this.userRepository.loadUserFromStorage();
    if (!storageUser) throw new Error('User not found in storage');

    return this.userRepository.getUser(storageUser.id);
  }
}

export default GetCurrentUserUseCase;
