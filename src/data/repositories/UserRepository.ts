import { inject, injectable } from 'inversify';

import { IUserStorage } from '@data/storage';
import { IUserStore } from '@data/store';
import { IUser } from '@domain/models';
import { IUserRepository } from '@domain/repositories';

@injectable()
class UserRepository implements IUserRepository {
  constructor(
    @inject(IUserStorage.$) private userStorage: IUserStorage,
    @inject(IUserStore.$) private userStore: IUserStore,
  ) {}

  saveUserInStorage(user: IUser): void {
    this.userStorage.saveUserData(user);
  }
  removeUserFromStorage(): void {
    this.userStorage.removeUserData();
  }

  setUserToStore(user: IUser): void {
    this.userStore.setUserData(user);
  }

  removeUserFromStore(): void {
    this.userStore.setUserData(null);
  }

  getUser(): IUser | null {
    return this.userStore.userData;
  }
}

export default UserRepository;
