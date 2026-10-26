import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IUserApi } from '@data/api';
import { UserMapper } from '@data/mappers';
import { IUserStorage } from '@data/storage';
import { IPatchUserRequestDto } from '@domain/dto';
import { IPagination, IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';
import { GetUsersRequestParams } from '@domain/request-params';

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(IUserStorage.$) private userStorage: IUserStorage,
    @inject(IUserApi.$) private userApi: IUserApi,
  ) {}

  /* persistent */
  loadUserFromStorage(): IUser | null {
    return this.userStorage.getUserData();
  }
  persistUser(user: IUser): void {
    this.userStorage.saveUserData(user);
  }
  clearPersistedUser(): void {
    this.userStorage.removeUserData();
  }

  /* api */
  async getUser(id: number): Promise<IUser> {
    return this.userApi
      .getUser(id)
      .then(getDataFromHttpResponse)
      .then(user => UserMapper.toEntity(user))
      .catch(getErrorFromHttpResponse);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userApi.deleteUser(id);
  }

  async patchUser(dto: Partial<IPatchUserRequestDto>): Promise<IUser> {
    return this.userApi
      .updateUser(dto)
      .then(getDataFromHttpResponse)
      .then(user => UserMapper.toEntity(user))
      .catch(getErrorFromHttpResponse);
  }

  async findUsers(params?: GetUsersRequestParams): Promise<IPagination<IUser>> {
    return this.userApi
      .findUsers(params)
      .then(getDataFromHttpResponse)
      .then(data => UserMapper.toPage(data))
      .catch(getErrorFromHttpResponse);
  }
}

export default UserRepository;
