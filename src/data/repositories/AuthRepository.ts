import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IAuthApi } from '@data/api/auth';
import { IAuthStorage } from '@data/storage';
import { IUserStore } from '@data/store';
import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';
import { IAuthRepository } from '@domain/repositories';
@injectable()
class AuthRepository implements IAuthRepository {
  constructor(
    @inject(IAuthStorage.$) private authStorage: IAuthStorage,
    @inject(IAuthApi.$) private authApi: IAuthApi,
    @inject(IUserStore.$) private userStore: IUserStore,
  ) {}

  async login(dto: ILoginRequestDTO): Promise<IAuthResponseDTO> {
    return this.authApi.signIn(dto).then(getDataFromHttpResponse).catch(getErrorFromHttpResponse);
  }

  async register(dto: IRegisterRequestDTO): Promise<IAuthResponseDTO> {
    return this.authApi.signUp(dto).then(getDataFromHttpResponse).catch(getErrorFromHttpResponse);
  }

  saveTokensToStorage(accessToken: string, refreshToken: string): void {
    this.authStorage.setAccessToken(accessToken);
    this.authStorage.setRefreshToken(refreshToken);
  }

  removeTokensFromStorage(): void {
    this.authStorage.removeAccessToken();
    this.authStorage.removeRefreshToken();
  }
}

export default AuthRepository;
