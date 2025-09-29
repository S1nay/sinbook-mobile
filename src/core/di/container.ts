import 'reflect-metadata';
import { Container } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { AuthApi, IAuthApi } from '@data/api';
import { AuthRepository, UserRepository } from '@data/repositories';
import { AuthStorage, IAuthStorage, IUserStorage, UserStorage } from '@data/storage';
import { IUserStore, UserStore } from '@data/store';
import { IAuthRepository, IUserRepository } from '@domain/repositories';
import { combineUseCases } from '@domain/use-cases';
import type { IHttpClient } from '@infrastructure/http/entities';
import type { INavigationService } from '@infrastructure/navigation/entities';
import NavigationService from '@infrastructure/navigation/service';
import { ISocketManager } from '@infrastructure/socket/entities';
import type { IStorage } from '@infrastructure/storage/entities';
import type { RootStackParamList } from '@navigation/configuration/routeParams';

import { SinbookHttpClientImpl, RootStorageImpl, SocketManagerImpl } from './implementations';

const container: Container = new Container();

/* -- Api's -- */

container.bind<IAuthApi>(IAuthApi.$).to(AuthApi).inSingletonScope();

/* -- Store's -- */
container.bind<IUserStore>(IUserStore.$).to(UserStore).inSingletonScope();

/* -- Storage's -- */

container.bind<IAuthStorage>(IAuthStorage.$).to(AuthStorage).inSingletonScope();
container.bind<IUserStorage>(IUserStorage.$).to(UserStorage).inSingletonScope();

/* -- API Http Clients -- */
container.bind<IHttpClient>(Identifiers.SinbookHttpClient).toConstantValue(SinbookHttpClientImpl);

/* -- Internal Storages -- */
container.bind<IStorage>(Identifiers.MMKVStorage).toConstantValue(RootStorageImpl);

/* -- Navigation -- */
container
  .bind<INavigationService<RootStackParamList>>(Identifiers.NavigationService)
  .to(NavigationService)
  .inSingletonScope();

/* -- Websocket -- */

container.bind<ISocketManager>(Identifiers.SocketManager).toConstantValue(SocketManagerImpl);

/* -- Repositories -- */

container.bind<IAuthRepository>(IAuthRepository.$).to(AuthRepository).inSingletonScope();
container.bind<IUserRepository>(IUserRepository.$).to(UserRepository).inSingletonScope();

/* -- Use Cases -- */

combineUseCases(container);

export default container;
