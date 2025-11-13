import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { IAuthResponseDTO, ILoginRequestDTO, IRegisterRequestDTO } from '@domain/dto';

import { IAuthApi } from './IAuthApi';

@injectable()
class AuthApi implements IAuthApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}

  signIn(dto: ILoginRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>> {
    return this.httpClient.post<IAuthResponseDTO, ILoginRequestDTO>('/auth/sign-in', dto);
  }

  signUp(dto: IRegisterRequestDTO): Promise<IHttpResponse<IAuthResponseDTO>> {
    return this.httpClient.post<IAuthResponseDTO, IRegisterRequestDTO>('/auth/sign-up', dto);
  }
}

export default AuthApi;
