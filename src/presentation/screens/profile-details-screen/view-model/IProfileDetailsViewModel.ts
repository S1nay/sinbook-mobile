import { ServiceIdentifier } from 'inversify';

export interface IProfileDetailsViewModel {
  logout: (callback: PureFunction) => void;
}

export namespace IProfileDetailsViewModel {
  export const $: ServiceIdentifier<IProfileDetailsViewModel> = Symbol('IProfileDetailsViewModel');
}
