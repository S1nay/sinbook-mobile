import { ServiceIdentifier } from 'inversify';

import { IUser } from '@domain/models';

export interface IUserRepository {
  saveUserInStorage(user: IUser): void;
  removeUserFromStorage(): void;
  getSavedUser(): IUser | null;

  setUserToStore(user: IUser): void;
  removeUserFromStore(): void;
  getLocalUser(): IUser | null;

  getUser(id: number): Promise<IUser>;
}

export namespace IUserRepository {
  export const $: ServiceIdentifier<IUserRepository> = Symbol('IUserRepository');
}
