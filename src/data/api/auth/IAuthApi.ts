import { ServiceIdentifier } from 'inversify';

import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';
import { IHttpResponse } from '@infrastructure/http/entities';

export interface IAuthApi {
  signIn(dto: ILoginRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>>;
  signUp(dto: IRegisterRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>>;
}

export namespace IAuthApi {
  export const $: ServiceIdentifier<IAuthApi> = Symbol('IAuthApi');
}
