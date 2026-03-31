import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpResponse, IHttpClient } from '@core/interfaces/http';
import { IPagination, IUser } from '@domain/models';
import { GetUsersRequestParams } from '@domain/request-params';

import { IUserApi } from './IUserApi';

@injectable()
class UserApi implements IUserApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private httpClient: IHttpClient) {}

  getUser(id: number): Promise<IHttpResponse<IUser>> {
    return this.httpClient.get<IUser>(`/user/${id}`);
  }

  deleteUser(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/user/${id}`);
  }

  updateUser(dto: IUser): Promise<IHttpResponse<IUser>> {
    return this.httpClient.patch<IUser, IUser>('/user', dto);
  }

  findUsers(params?: GetUsersRequestParams): Promise<IHttpResponse<IPagination<IUser>>> {
    return this.httpClient.get<IPagination<IUser>>('/user', params ? { params } : undefined);
  }
}

export default UserApi;
