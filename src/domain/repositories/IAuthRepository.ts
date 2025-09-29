import { ServiceIdentifier } from 'inversify';

import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';
export interface IAuthRepository {
  login(dto: ILoginRequestDTO): Promise<IAuthResponseDTO>;
  register(dto: IRegisterRequestDTO): Promise<IAuthResponseDTO>;

  saveTokensToStorage(accessToken: string, refreshToken: string): void;
  removeTokensFromStorage(): void;
}

export namespace IAuthRepository {
  export const $: ServiceIdentifier<IAuthRepository> = Symbol('IAuthRepository');
}
