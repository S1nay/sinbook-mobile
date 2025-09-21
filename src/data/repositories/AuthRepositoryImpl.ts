import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { getDataFromHttpResponse } from '@core/helpers';
import { ILoginResponseDTO, ILoginRequestDTO } from '@domain/dto';
import { IUser } from '@domain/models';
import { IAuthRepository } from '@domain/repositories';
import { IHttpClient } from '@infrastructure/http/entities';
import { IStorage, UserStorageKeys } from '@infrastructure/storage/entities';

@injectable()
class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    @inject(Identifiers.MMKVStorage) private storage: IStorage,
    @inject(Identifiers.SinbookHttpClient) private httpClient: IHttpClient,
  ) {}

  async login(dto: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    return this.httpClient
      .post<ILoginResponseDTO, ILoginRequestDTO>('/auth/sign-in', dto)
      .then(getDataFromHttpResponse);
  }

  saveUserData(value: IUser): void {
    return this.storage.set(UserStorageKeys.USER, JSON.stringify(value));
  }

  removeUserData(): void {
    return this.storage.delete(UserStorageKeys.USER);
  }

  saveAccessToken(value: string): void {
    return this.storage.set(UserStorageKeys.ACCESS_TOKEN, value);
  }

  removeAccessToken(): void {
    return this.storage.delete(UserStorageKeys.ACCESS_TOKEN);
  }

  saveRefreshToken(value: string): void {
    return this.storage.set(UserStorageKeys.REFRESH_TOKEN, value);
  }

  removeRefreshToken(): void {
    return this.storage.delete(UserStorageKeys.REFRESH_TOKEN);
  }

  setIsRememberMe(value: boolean): void {
    return this.storage.set(UserStorageKeys.IS_REMEMBER_ME, value);
  }

  removeIsRememberMe(): void {
    return this.storage.delete(UserStorageKeys.IS_REMEMBER_ME);
  }
}

export default AuthRepositoryImpl;
