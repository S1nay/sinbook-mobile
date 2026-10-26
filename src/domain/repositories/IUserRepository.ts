import { ServiceIdentifier } from 'inversify';

import { IPatchUserRequestDto } from '@domain/dto';
import { AuthUser, IPagination, IUser } from '@domain/models';
import { GetUsersRequestParams } from '@domain/request-params';

export interface IUserRepository {
  // persistent
  loadUserFromStorage(): AuthUser | null;
  persistUser(user: AuthUser): void;
  clearPersistedUser(): void;

  getUser(id: number): Promise<IUser>;
  deleteUser(id: number): Promise<void>;
  patchUser(dto: Partial<IPatchUserRequestDto>): Promise<IUser>;
  findUsers(params?: GetUsersRequestParams): Promise<IPagination<IUser>>;
}

export namespace IUserRepository {
  export const $: ServiceIdentifier<IUserRepository> = Symbol('IUserRepository');
}
