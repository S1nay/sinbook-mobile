import { ServiceIdentifier } from 'inversify';

import { IPatchUserRequestDto } from '@domain/dto';
import { IUser } from '@domain/models';
import { IHttpResponse } from '@infrastructure/http/entities';

export interface IUserApi {
  getUser(id: number): Promise<IHttpResponse<IUser>>;
  deleteUser(id: number): void;
  updateUser(dto: Partial<IPatchUserRequestDto>): Promise<IHttpResponse<IUser>>;
}

export namespace IUserApi {
  export const $: ServiceIdentifier<IUserApi> = Symbol('IUserApi');
}
