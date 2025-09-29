import { AxiosInstance } from 'axios';

import { AuthStorageKeys } from '@data/storage';
import { AppRouteNames } from '@navigation/configuration';

import {
  IRequestInterceptor,
  IResponseInterceptor,
  IRefreshTokenResponseDto,
  IRefreshTokenRequestDto,
} from './interfaces';

const requestInterceptor = async ({ request, storage }: IRequestInterceptor) => {
  const accessToken = storage.getString(AuthStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
};

const responseInterceptor = async ({
  httpClient,
  error,
  storage,
  navigation,
}: IResponseInterceptor<AxiosInstance>) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest?._retry) {
    originalRequest._retry = true;

    try {
      const refresh = storage.getString(AuthStorageKeys.REFRESH_TOKEN);

      const { data } = await httpClient.post<IRefreshTokenResponseDto, IRefreshTokenRequestDto>(
        '/auth/refresh',
        { refresh: refresh ?? '' },
      );

      if (data) {
        storage.set<string>(AuthStorageKeys.ACCESS_TOKEN, data.access);

        httpClient.updateHeaders({ Authorization: 'Bearer ' + data.access });

        return httpClient.instance?.(originalRequest);
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);

      storage.delete(AuthStorageKeys.ACCESS_TOKEN);
      storage.delete(AuthStorageKeys.REFRESH_TOKEN);

      navigation.reset({
        index: 0,
        routes: [{ name: AppRouteNames.Auth }],
      });

      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

export { requestInterceptor, responseInterceptor };
