import { ServiceIdentifier } from 'inversify';

import { IUser } from '@domain/models';

export interface IUserRepository {
  saveUserInStorage(user: IUser): void;
  removeUserFromStorage(): void;

  setUserToStore(user: IUser): void;
  removeUserFromStore(): void;
  getUser(): IUser | null;
}

export namespace IUserRepository {
  export const $: ServiceIdentifier<IUserRepository> = Symbol('IUserRepository');
}
