import { inject, injectable } from 'inversify';

import { IPagination, IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';
import { GetUsersRequestParams } from '@domain/request-params';

@injectable()
class SearchUsersUseCase {
  constructor(@inject(IUserRepository.$) private userRepository: IUserRepository) {}

  async execute(params: GetUsersRequestParams): Promise<IPagination<IUser>> {
    return this.userRepository.findUsers(params);
  }
}

export default SearchUsersUseCase;
