import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { AuthUseCases } from '@domain/use-cases';

import { IProfileDetailsViewModel } from './IProfileDetailsViewModel';

@injectable()
class ProfileDetailsViewModel implements IProfileDetailsViewModel {
  constructor(@inject(AuthUseCases.$Logout) private logoutUseCase: UseCase) {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  logout(callback: PureFunction) {
    this.logoutUseCase.execute().then(callback);
  }
}

export default ProfileDetailsViewModel;
