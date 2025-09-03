import { Container } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import type { IHttpClient } from '@infrastructure/http/entities';
import NavigationServiceImpl from '@infrastructure/navigation-service';
import type { INavigationService } from '@infrastructure/navigation-service/entities';
import { ISocketManager } from '@infrastructure/socket/entities';
import type { IStorage } from '@infrastructure/storage/entities';
import type { RootStackParamList } from '@navigation/configuration/routeParams';

import { SinbookHttpClientImpl, RootStorageImpl, SocketManagerImpl } from './implementations';

const container: Container = new Container();

/* -- API Http Clients -- */
container.bind<IHttpClient>(Identifiers.SinbookHttpClient).toConstantValue(SinbookHttpClientImpl);

/* -- Internal Storages -- */
container.bind<IStorage>(Identifiers.MMKVStorage).toConstantValue(RootStorageImpl);

/* -- Navigation -- */
container
  .bind<INavigationService<RootStackParamList>>(Identifiers.NavigationService)
  .to(NavigationServiceImpl)
  .inSingletonScope();

/* -- Websocket -- */

container.bind<ISocketManager>(Identifiers.SocketManager).toConstantValue(SocketManagerImpl);

export default container;
