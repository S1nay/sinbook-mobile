import { ServiceIdentifier } from 'inversify';

import { TTheme } from '@domain/models';

export interface IThemeStore {
  activeTheme: TTheme | null;
  setActiveTheme(theme: TTheme | null): void;
}

export namespace IThemeStore {
  export const $: ServiceIdentifier<IThemeStore> = Symbol('IThemeStore');
}
