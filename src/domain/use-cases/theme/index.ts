import { ServiceIdentifier } from 'inversify';

import GetThemeUseCase from './GetThemeUseCase';
import SwitchThemeUseCase from './SwitchThemeUseCase';

export { SwitchThemeUseCase, GetThemeUseCase };

export namespace ThemeUseCases {
  export const $Switch: ServiceIdentifier<SwitchThemeUseCase> = Symbol('SwitchThemeUseCase');
  export const $Get: ServiceIdentifier<GetThemeUseCase> = Symbol('GetThemeUseCase');
}
