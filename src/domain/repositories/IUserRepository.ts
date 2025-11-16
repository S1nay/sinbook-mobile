import { ServiceIdentifier } from 'inversify';

import { IPatchUserRequestDto } from '@domain/dto';
import { AuthUser, IUser } from '@domain/models';

export interface IUserRepository {
  // session
  getUserSession(): IUser | null;
  setUserSession(user: IUser | null): void;
  clearUserSession(): void;

  // persistent
  loadUserFromStorage(): AuthUser | null;
  persistUser(user: AuthUser): void;
  clearPersistedUser(): void;

  getUser(id: number): Promise<IUser>;
  patchUser(dto: Partial<IPatchUserRequestDto>): Promise<IUser>;
}

export namespace IUserRepository {
  export const $: ServiceIdentifier<IUserRepository> = Symbol('IUserRepository');
}
