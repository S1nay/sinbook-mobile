import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IStorage } from '@core/interfaces/storage';
import { TTheme } from '@domain/models';

import { IThemeStorage } from './IThemeStorage';
import { ThemeStorageKeys } from './ThemeStorageKeys';

@injectable()
class ThemeStorage implements IThemeStorage {
  constructor(@inject(Identifiers.MMKVStorage) private readonly storage: IStorage) {}

  getTheme(): TTheme | null {
    return (this.storage.getString(ThemeStorageKeys.THEME) as TTheme) ?? null;
  }

  saveTheme(theme: TTheme): void {
    this.storage.set(ThemeStorageKeys.THEME, theme);
  }

  removeTheme(): void {
    this.storage.delete(ThemeStorageKeys.THEME);
  }
}

export default ThemeStorage;
