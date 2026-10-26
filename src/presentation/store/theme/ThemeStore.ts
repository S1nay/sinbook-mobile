import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { TTheme } from '@domain/models';

import { IThemeStore } from './IThemeStore';

@injectable()
class ThemeStore implements IThemeStore {
  private _activeTheme: TTheme | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get activeTheme(): TTheme | null {
    return this._activeTheme;
  }

  setActiveTheme(theme: TTheme | null): void {
    this._activeTheme = theme;
  }
}

export default ThemeStore;
