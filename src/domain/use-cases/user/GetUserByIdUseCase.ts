import { inject, injectable } from 'inversify';

import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class GetUserByIdUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(userId: number): Promise<IUser> {
    return this.userRepository.getUser(userId);
  }
}

export default GetUserByIdUseCase;
