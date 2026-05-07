import { inject, injectable } from 'inversify';

import { IThemeStorage } from '@data/storage';
import { IThemeStore } from '@data/store';
import { TTheme } from '@domain/models';
import { IThemeRepository } from '@domain/repositories';

@injectable()
class ThemeRepository implements IThemeRepository {
  constructor(
    @inject(IThemeStorage.$) private themeStorage: IThemeStorage,
    @inject(IThemeStore.$) private themeStore: IThemeStore,
  ) {}

  getSavedTheme(): TTheme | null {
    return this.themeStorage.getTheme();
  }

  saveTheme(theme: TTheme): void {
    this.themeStorage.saveTheme(theme);
  }

  getActiveTheme(): TTheme | null {
    return this.themeStore.activeTheme;
  }

  setActiveTheme(theme: TTheme): void {
    this.themeStore.setActiveTheme(theme);
  }
}

export default ThemeRepository;
