import { ServiceIdentifier } from 'inversify';

import { TTheme } from '@domain/models';

export interface ISettingsViewModel {
  activeTheme: TTheme;
  switchTheme(theme: TTheme): void;
  logout(): void;
}

export namespace ISettingsViewModel {
  export const $: ServiceIdentifier<ISettingsViewModel> = Symbol('ISettingsViewModel');
}
