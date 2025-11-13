import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';

export interface IAuthApi {
  signIn(dto: ILoginRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>>;
  signUp(dto: IRegisterRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>>;
}

export namespace IAuthApi {
  export const $: ServiceIdentifier<IAuthApi> = Symbol('IAuthApi');
}
