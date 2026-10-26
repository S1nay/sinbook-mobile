import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { IHttpClient } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { IStorage } from '@core/interfaces/storage';
import { RootStackParamList } from '@navigation/configuration';

type CustomAxiosError = AxiosError & {
  config: AxiosRequestConfig & { _retry?: boolean };
};

export interface IRequestInterceptor {
  request: InternalAxiosRequestConfig;
  storage: IStorage;
}

export interface IResponseInterceptor<T> {
  error: CustomAxiosError;
  httpClient: IHttpClient<T>;
  storage: IStorage;
  navigation: INavigationService<RootStackParamList>;
  /** Общая точка сброса сессии (токены + сторы), вызывается при неудачном refresh */
  onSessionExpired: () => Promise<unknown>;
}

export interface IRefreshTokenRequestDto {
  refresh: string;
}

export interface IRefreshTokenResponseDto {
  access: string;
}
