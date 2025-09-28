import { ServiceIdentifier } from 'inversify';

import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';
import { IUser } from '@domain/models';

export interface IAuthRepository {
  login(dto: ILoginRequestDTO): Promise<IAuthResponseDTO>;
  register(dto: IRegisterRequestDTO): Promise<IAuthResponseDTO>;

  saveAccessToken(value: string): void;
  removeAccessToken(): void;

  saveRefreshToken(value: string): void;
  removeRefreshToken(): void;

  saveUserData(value: IUser): void;
  removeUserData(): void;

  setIsRememberMe(value: boolean): void;
  removeIsRememberMe(): void;
}

export namespace IAuthRepository {
  export const $: ServiceIdentifier<IAuthRepository> = Symbol('IAuthRepository');
}
