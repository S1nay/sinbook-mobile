import { inject, injectable } from 'inversify';

import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';
import { GetUserRequestParams } from '@domain/request-params';

@injectable()
class GetUserUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(params: GetUserRequestParams & { isRefetching: boolean }): Promise<IUser> {
    const { id, isRefetching } = params;

    if (id) {
      const fetchedUser = await this.userRepository.getUser(id);

      return fetchedUser;
    } else {
      const sessionUser = this.userRepository.getUserSession();

      if (isRefetching || !sessionUser) {
        const storageUser = this.userRepository.loadUserFromStorage();

        if (!storageUser) {
          throw new Error('User not found in storage');
        }

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
