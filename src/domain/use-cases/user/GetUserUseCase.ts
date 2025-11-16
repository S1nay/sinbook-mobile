import { inject, injectable } from 'inversify';

import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class GetUserUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(userId?: number): Promise<IUser> {
    if (userId) {
      const fetchedUser = await this.userRepository.getUser(userId);

      return fetchedUser;
    } else {
      const sessionUser = this.userRepository.getUserSession();

      if (!sessionUser) {
        const storageUser = this.userRepository.loadUserFromStorage()!;
        const fetchedUser = await this.userRepository.getUser(storageUser.id);
        this.userRepository.setUserSession(fetchedUser);
        return fetchedUser;
      } else {
        return sessionUser;
      }
    }
  }
}

export default GetUserUseCase;
