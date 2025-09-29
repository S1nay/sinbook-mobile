import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IUser } from '@domain/models';
import { IStorage } from '@infrastructure/storage/entities';

import { IUserStorage } from './IUserStorage';
import { UserStorageKeys } from './UserStorageKeys';

@injectable()
class UserStorage implements IUserStorage {
  constructor(@inject(Identifiers.MMKVStorage) private readonly storage: IStorage) {}

  saveUserData(userData: IUser): void {
    this.storage.set(UserStorageKeys.USER_DATA, JSON.stringify(userData));
  }

  removeUserData(): void {
    this.storage.delete(UserStorageKeys.USER_DATA);
  }

  getUserData(): IUser | null {
    return this.storage.getObject(UserStorageKeys.USER_DATA);
  }
}

export default UserStorage;
