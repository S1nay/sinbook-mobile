import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IUserApi } from '@data/api';
import { IUserStorage } from '@data/storage';
import { IUserStore } from '@data/store';
import { IPatchUserRequestDto } from '@domain/dto';
import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(IUserStorage.$) private userStorage: IUserStorage,
    @inject(IUserStore.$) private userStore: IUserStore,
    @inject(IUserApi.$) private userApi: IUserApi,
  ) {}

  /* session */
  getUserSession(): IUser | null {
    return this.userStore.userData;
  }
  setUserSession(user: IUser | null): void {
    this.userStore.setUserData(user);
  }
  clearUserSession(): void {
    this.userStore.setUserData(null);
  }

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
    return this.userApi.getUser(id).then(getDataFromHttpResponse).catch(getErrorFromHttpResponse);
  }

  async patchUser(dto: Partial<IPatchUserRequestDto>): Promise<IUser> {
    return this.userApi
      .updateUser(dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}

export default UserRepository;
