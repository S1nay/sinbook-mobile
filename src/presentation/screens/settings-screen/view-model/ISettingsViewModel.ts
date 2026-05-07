import { ServiceIdentifier } from 'inversify';

export interface ISettingsViewModel {
  logout(callback: PureFunction): void;
}

export namespace ISettingsViewModel {
  export const $: ServiceIdentifier<ISettingsViewModel> = Symbol('ISettingsViewModel');
}
