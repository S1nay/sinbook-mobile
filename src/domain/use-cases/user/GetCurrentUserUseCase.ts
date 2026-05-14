import { inject, injectable } from 'inversify';

import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class GetCurrentUserUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(useCache: boolean = true): Promise<IUser> {
    if (useCache) {
      const sessionUser = this.userRepository.getUserSession();
      if (sessionUser) return sessionUser;
    }

    const storageUser = this.userRepository.loadUserFromStorage();
    if (!storageUser) throw new Error('User not found in storage');

    const fetchedUser = await this.userRepository.getUser(storageUser.id);
    this.userRepository.setUserSession(fetchedUser);
    return fetchedUser;
  }
}

export default GetCurrentUserUseCase;
