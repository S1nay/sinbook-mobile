import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IPaginationResponseDto, IUserResponseDto } from '@data/dto/response';
import { IPatchUserRequestDto } from '@domain/dto';
import { GetUsersRequestParams } from '@domain/request-params';

export interface IUserApi {
  getUser(id: number): Promise<IHttpResponse<IUserResponseDto>>;
  deleteUser(id: number): void;
  updateUser(dto: Partial<IPatchUserRequestDto>): Promise<IHttpResponse<IUserResponseDto>>;
  findUsers(
    params?: GetUsersRequestParams,
  ): Promise<IHttpResponse<IPaginationResponseDto<IUserResponseDto>>>;
}

export namespace IUserApi {
  export const $: ServiceIdentifier<IUserApi> = Symbol('IUserApi');
}
