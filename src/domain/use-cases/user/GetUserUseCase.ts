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
      let localUser = this.userRepository.getLocalUser();

      if (!localUser) {
        const savedUser = this.userRepository.getSavedUser()!;
        this.userRepository.setUserToStore(savedUser);
        localUser = savedUser;
      }

      const fetchedUser = await this.userRepository.getUser(localUser.id);

      return fetchedUser;
    }
  }
}

export default GetUserUseCase;
