import { Container } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import type { IHttpClient } from '@infrastructure/http/entities';
import NavigationServiceImpl from '@infrastructure/navigation';
import { INavigationService } from '@infrastructure/navigation/entities';
import type { IStorage } from '@infrastructure/storage/entities';
import { RootStackParamList } from '@navigation/configuration/routeParams';

import { SinbookHttpClientImpl, RootStorageImpl } from './implementations';

const container: Container = new Container();

/* -- API Http Clients */
container.bind<IHttpClient>(Identifiers.SinbookHttpClient).toConstantValue(SinbookHttpClientImpl);

/* -- Internal Storages */
container.bind<IStorage>(Identifiers.MMKVStorage).toConstantValue(RootStorageImpl);

container
  .bind<INavigationService<RootStackParamList>>(Identifiers.NavigationService)
  .to(NavigationServiceImpl)
  .inSingletonScope();

export default container;
