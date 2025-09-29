import { ServiceIdentifier } from 'inversify';

import { IUser } from '@domain/models';
import { IHttpResponse } from '@infrastructure/http/entities';

export interface IUserApi {
  getUser(id: number): Promise<IHttpResponse<IUser>>;
  deleteUser(id: number): void;
  updateUser(dto: IUser): Promise<IHttpResponse<IUser>>;
}

export namespace IUserApi {
  export const $: ServiceIdentifier<IUserApi> = Symbol('IUserApi');
}
