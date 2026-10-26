import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { IPaginationResponseDto, IUserResponseDto } from '@data/dto/response';
import { IPatchUserRequestDto } from '@domain/dto';
import { GetUsersRequestParams } from '@domain/request-params';

import { IUserApi } from './IUserApi';

@injectable()
class UserApi implements IUserApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private httpClient: IHttpClient) {}

  getUser(id: number): Promise<IHttpResponse<IUserResponseDto>> {
    return this.httpClient.get<IUserResponseDto>(`/user/${id}`);
  }

  deleteUser(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/user/${id}`);
  }

  updateUser(dto: Partial<IPatchUserRequestDto>): Promise<IHttpResponse<IUserResponseDto>> {
    return this.httpClient.patch<IUserResponseDto, Partial<IPatchUserRequestDto>>('/user', dto);
  }

  findUsers(
    params?: GetUsersRequestParams,
  ): Promise<IHttpResponse<IPaginationResponseDto<IUserResponseDto>>> {
    return this.httpClient.get<IPaginationResponseDto<IUserResponseDto>>(
      '/user',
      params ? { params } : undefined,
    );
  }
}

export default UserApi;
