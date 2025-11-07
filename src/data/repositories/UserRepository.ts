import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse } from '@core/helpers';
import { IUserApi } from '@data/api';
import { IUserStorage } from '@data/storage';
import { IUserStore } from '@data/store';
import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(IUserStorage.$) private userStorage: IUserStorage,
    @inject(IUserStore.$) private userStore: IUserStore,
    @inject(IUserApi.$) private userApi: IUserApi,
  ) {}

  saveUserInStorage(user: IUser): void {
    this.userStorage.saveUserData(user);
  }

  removeUserFromStorage(): void {
    this.userStorage.removeUserData();
  }

  getSavedUser(): IUser | null {
    return this.userStorage.getUserData();
  }

  setUserToStore(user: IUser): void {
    this.userStore.setUserData(user);
  }

  removeUserFromStore(): void {
    this.userStore.setUserData(null);
  }

  getLocalUser(): IUser | null {
    return this.userStore.userData;
  }

  async getUser(id: number): Promise<IUser> {
    return this.userApi.getUser(id).then(getDataFromHttpResponse);
  }
}

export default UserRepository;
