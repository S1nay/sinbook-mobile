import { inject, injectable } from 'inversify';

import { IThemeStorage } from '@data/storage';
import { TTheme } from '@domain/models';
import { IThemeRepository } from '@domain/repositories';

@injectable()
class ThemeRepository implements IThemeRepository {
  constructor(@inject(IThemeStorage.$) private themeStorage: IThemeStorage) {}

  getSavedTheme(): TTheme | null {
    return this.themeStorage.getTheme();
  }

  saveTheme(theme: TTheme): void {
    this.themeStorage.saveTheme(theme);
  }
}

export default ThemeRepository;
