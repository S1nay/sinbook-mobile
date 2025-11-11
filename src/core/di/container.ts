import 'reflect-metadata';
import { Container } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import {
  AuthApi,
  FileApi,
  IAuthApi,
  IFileApi,
  IPostApi,
  IUserApi,
  PostApi,
  UserApi,
} from '@data/api';
import { AuthRepository, FileRepository, PostRepository, UserRepository } from '@data/repositories';
import { AuthStorage, IAuthStorage, IUserStorage, UserStorage } from '@data/storage';
import { IUserStore, UserStore } from '@data/store';
import {
  IAuthRepository,
  IUserRepository,
  IFileRepository,
  IPostRepository,
} from '@domain/repositories';
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
container.bind<IUserApi>(IUserApi.$).to(UserApi).inSingletonScope();
container.bind<IPostApi>(IPostApi.$).to(PostApi).inSingletonScope();
container.bind<IFileApi>(IFileApi.$).to(FileApi).inSingletonScope();

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
container.bind<IPostRepository>(IPostRepository.$).to(PostRepository).inSingletonScope();
container.bind<IFileRepository>(IFileRepository.$).to(FileRepository).inSingletonScope();

/* -- Use Cases -- */

combineUseCases(container);

export default container;
