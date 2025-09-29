import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IStorage } from '@infrastructure/storage/entities';

import { AuthStorageKeys } from './AuthStorageKeys';
import { IAuthStorage } from './IAuthStorage';

@injectable()
class AuthStorage implements IAuthStorage {
  constructor(@inject(Identifiers.MMKVStorage) private readonly storage: IStorage) {}

  setAccessToken(access: string): void {
    this.storage.set(AuthStorageKeys.ACCESS_TOKEN, access);
  }

  setRefreshToken(refresh: string): void {
    this.storage.set(AuthStorageKeys.REFRESH_TOKEN, refresh);
  }

  removeAccessToken(): void {
    this.storage.delete(AuthStorageKeys.ACCESS_TOKEN);
  }
  removeRefreshToken(): void {
    this.storage.delete(AuthStorageKeys.REFRESH_TOKEN);
  }
}

export default AuthStorage;
