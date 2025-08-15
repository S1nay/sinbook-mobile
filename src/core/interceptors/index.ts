import { AxiosInstance } from 'axios';

import {
  IRequestInterceptor,
  IResponseInterceptor,
  IRefreshTokenDTO,
  IRefreshTokenResponse,
} from '@core/interceptors/interfaces';
import { UserStorageKeys } from '@infrastructure/storage/entities';
import { AppRouteNames } from '@navigation/configuration';

const requestInterceptor = async ({ request, storage }: IRequestInterceptor) => {
  const accessToken = storage.getString(UserStorageKeys.ACCESS_TOKEN);

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
      const refresh = storage.getString(UserStorageKeys.REFRESH_TOKEN);

      const { data } = await httpClient.post<IRefreshTokenResponse, IRefreshTokenDTO>(
        '/auth/refresh',
        { refresh: refresh ?? '' },
      );

      if (data) {
        storage.set<string>(UserStorageKeys.ACCESS_TOKEN, data.access);

        httpClient.updateHeaders({ Authorization: 'Bearer ' + data.access });

        return httpClient.instance?.(originalRequest);
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);

      storage.delete(UserStorageKeys.ACCESS_TOKEN);
      storage.delete(UserStorageKeys.REFRESH_TOKEN);

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
