import { ServiceIdentifier } from 'inversify';

export interface IAuthStorage {
  getAccessToken(): string | undefined;

  setAccessToken(access: string): void;
  setRefreshToken(refresh: string): void;

  removeAccessToken(): void;
  removeRefreshToken(): void;
}

export namespace IAuthStorage {
  export const $: ServiceIdentifier<IAuthStorage> = Symbol('IAuthStorage');
}
