import { ServiceIdentifier } from 'inversify';

export interface IBootstrapViewModel {
  // Применяет сохранённую тему и возвращает, авторизован ли пользователь (синхронно).
  initialize(): boolean;
}

export namespace IBootstrapViewModel {
  export const $: ServiceIdentifier<IBootstrapViewModel> = Symbol('IBootstrapViewModel');
}
