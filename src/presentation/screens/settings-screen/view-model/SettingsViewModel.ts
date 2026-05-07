import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { AuthUseCases } from '@domain/use-cases';

import { ISettingsViewModel } from './ISettingsViewModel';

@injectable()
class SettingsViewModel implements ISettingsViewModel {
  constructor(
    @inject(AuthUseCases.$Logout)
    private logoutUseCase: UseCase<void, void>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  logout(callback: PureFunction): void {
    this.logoutUseCase.execute().then(callback);
  }
}

export default SettingsViewModel;
