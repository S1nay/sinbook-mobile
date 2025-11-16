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
      const localUser = this.userRepository.getLocalUser();

      if (!localUser) {
        const savedUser = this.userRepository.getSavedUser()!;
        const fetchedUser = await this.userRepository.getUser(savedUser.id);
        this.userRepository.setUserToStore(fetchedUser);
        return fetchedUser;
      } else {
        return localUser;
      }
    }
  }
}

export default GetUserUseCase;
