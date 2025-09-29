import { ServiceIdentifier } from 'inversify';

import { IUser } from '@domain/models';

export interface IUserStorage {
  saveUserData(userData: IUser): void;
  removeUserData(): void;
  getUserData(): IUser | null;
}

export namespace IUserStorage {
  export const $: ServiceIdentifier<IUserStorage> = Symbol('IUserStorage');
}
