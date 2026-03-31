import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IPatchUserRequestDto } from '@domain/dto';
import { IPagination, IUser } from '@domain/models';
import { GetUsersRequestParams } from '@domain/request-params';

export interface IUserApi {
  getUser(id: number): Promise<IHttpResponse<IUser>>;
  deleteUser(id: number): void;
  updateUser(dto: Partial<IPatchUserRequestDto>): Promise<IHttpResponse<IUser>>;
  findUsers(params?: GetUsersRequestParams): Promise<IHttpResponse<IPagination<IUser>>>;
}

export namespace IUserApi {
  export const $: ServiceIdentifier<IUserApi> = Symbol('IUserApi');
}
