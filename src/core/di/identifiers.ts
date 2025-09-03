import { AxiosInstance } from 'axios';
import { ServiceIdentifier } from 'inversify';

import type { IHttpClient } from '@infrastructure/http/entities';
import type { INavigationService } from '@infrastructure/navigation-service/entities';
import { ISocketManager } from '@infrastructure/socket/entities';
import type { IStorage } from '@infrastructure/storage/entities';
import type { RootStackParamList } from '@navigation/configuration/routeParams';

export namespace Identifiers {
  export const SinbookHttpClient: ServiceIdentifier<IHttpClient<AxiosInstance>> =
    Symbol('SinbookHttpClient');

  export const MMKVStorage: ServiceIdentifier<IStorage> = Symbol('MMKVStorage');

  export const NavigationService: ServiceIdentifier<INavigationService<RootStackParamList>> =
    Symbol('NavigationService');

  export const SocketManager: ServiceIdentifier<ISocketManager> = Symbol('SocketManager');
}
