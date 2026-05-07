import { ServiceIdentifier } from 'inversify';

import { TTheme } from '@domain/models';

export interface IThemeRepository {
  getSavedTheme(): TTheme | null;
  saveTheme(theme: TTheme): void;
  getActiveTheme(): TTheme | null;
  setActiveTheme(theme: TTheme): void;
}

export namespace IThemeRepository {
  export const $: ServiceIdentifier<IThemeRepository> = Symbol('IThemeRepository');
}
