import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { IHttpClient } from '@infrastructure/http/entities';
import { INavigationService } from '@infrastructure/navigation/entities';
import { IStorage } from '@infrastructure/storage/entities';
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
}

export interface IRefreshTokenRequestDto {
  refresh: string;
}

export interface IRefreshTokenResponseDto {
  access: string;
}
