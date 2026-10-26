import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { TTheme } from '@domain/models';
import { AuthUseCases, ThemeUseCases } from '@domain/use-cases';
import { IThemeStore } from '@presentation/store';
import applyTheme from '@shared/theme/applyTheme';

import { IBootstrapViewModel } from './IBootstrapViewModel';

@injectable()
class BootstrapViewModel implements IBootstrapViewModel {
  constructor(
    @inject(AuthUseCases.$CheckAuth) private checkAuthUseCase: UseCase<void, boolean, boolean>,
    @inject(ThemeUseCases.$Get)
    private getThemeUseCase: UseCase<void, TTheme | null, TTheme | null>,
    @inject(IThemeStore.$) private themeStore: IThemeStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  initialize(): boolean {
    const theme = this.getThemeUseCase.execute() ?? 'system';
    this.themeStore.setActiveTheme(theme);
    applyTheme(theme);

    return this.checkAuthUseCase.execute();
  }
}

export default BootstrapViewModel;
