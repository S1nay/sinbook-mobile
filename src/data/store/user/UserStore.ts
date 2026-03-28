import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IUser } from '@domain/models';

import { IUserStore } from './IUserStore';

@injectable()
class UserStore implements IUserStore {
  private _userData: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get userData(): IUser | null {
    return this._userData;
  }

  setUserData(userData: IUser | null): void {
    this._userData = userData;
  }
}

export default UserStore;
