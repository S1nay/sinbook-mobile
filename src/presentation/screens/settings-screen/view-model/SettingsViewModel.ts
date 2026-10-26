import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { Identifiers } from '@core/di/identifiers';
import { INavigationService } from '@core/interfaces/navigation';
import { TTheme } from '@domain/models';
import { AuthUseCases, ThemeUseCases } from '@domain/use-cases';
import { AppRouteNames, RootStackParamList } from '@navigation/configuration';
import { IPostsStore, IThemeStore, IUserStore } from '@presentation/store';
import applyTheme from '@shared/theme/applyTheme';

import { ISettingsViewModel } from './ISettingsViewModel';

@injectable()
class SettingsViewModel implements ISettingsViewModel {
  constructor(
    @inject(AuthUseCases.$Logout) private logoutUseCase: UseCase<void, boolean>,
    @inject(ThemeUseCases.$Switch) private switchThemeUseCase: UseCase<TTheme, void, void>,
    @inject(Identifiers.NavigationService)
    private navigationService: INavigationService<RootStackParamList>,
    @inject(IThemeStore.$) private themeStore: IThemeStore,
    @inject(IPostsStore.$) private postsStore: IPostsStore,
    @inject(IUserStore.$) private userStore: IUserStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get activeTheme(): TTheme {
    return this.themeStore.activeTheme ?? 'system';
  }

  switchTheme(theme: TTheme): void {
    this.switchThemeUseCase.execute(theme);
    this.themeStore.setActiveTheme(theme);
    applyTheme(theme);
  }

  async logout(): Promise<void> {
    await this.logoutUseCase.execute();
    // чистим реактивную сессию presentation и уводим на экран авторизации
    this.postsStore.clear();
    this.userStore.clear();
    this.navigationService.reset({ index: 0, routes: [{ name: AppRouteNames.Auth }] });
  }
}

export default SettingsViewModel;
