import { ServiceIdentifier } from 'inversify';

import { IUser } from '@domain/models';

export interface IUserStore {
  userData: IUser | null;
  setUserData(userData: IUser | null): void;
}

export namespace IUserStore {
  export const $: ServiceIdentifier<IUserStore> = Symbol('IUserStore');
}
