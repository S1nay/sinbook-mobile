import { ServiceIdentifier } from 'inversify';

import { TTheme } from '@domain/models';

export interface IThemeStorage {
  getTheme(): TTheme | null;
  saveTheme(theme: TTheme): void;
  removeTheme(): void;
}

export namespace IThemeStorage {
  export const $: ServiceIdentifier<IThemeStorage> = Symbol('IThemeStorage');
}
