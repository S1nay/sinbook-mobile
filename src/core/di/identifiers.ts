import { AxiosInstance } from 'axios';
import { ServiceIdentifier } from 'inversify';

import { IHttpClient } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { ISocketManager } from '@core/interfaces/socket';
import { IStorage } from '@core/interfaces/storage';
import type { RootStackParamList } from '@navigation/configuration/routeParams';

export namespace Identifiers {
  export const SinbookHttpClient: ServiceIdentifier<IHttpClient<AxiosInstance>> =
    Symbol('SinbookHttpClient');

  export const MMKVStorage: ServiceIdentifier<IStorage> = Symbol('MMKVStorage');

  export const NavigationService: ServiceIdentifier<INavigationService<RootStackParamList>> =
    Symbol('NavigationService');

  export const SocketManager: ServiceIdentifier<ISocketManager> = Symbol('SocketManager');
}
