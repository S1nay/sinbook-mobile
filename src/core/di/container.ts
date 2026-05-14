import 'reflect-metadata';
import { Container } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpClient } from '@core/interfaces/http';
import { INavigationService } from '@core/interfaces/navigation';
import { ISocketManager } from '@core/interfaces/socket';
import { IStorage } from '@core/interfaces/storage';
import {
  AuthApi,
  CommentApi,
  FileApi,
  FollowsApi,
  IAuthApi,
  ICommentApi,
  IFileApi,
  IFollowsApi,
  ILikeApi,
  IPostApi,
  IUserApi,
  LikeApi,
  PostApi,
  UserApi,
} from '@data/api';
import {
  AuthRepository,
  CommentRepository,
  FileRepository,
  FollowsRepository,
  LikeRepository,
  PostRepository,
  ThemeRepository,
  UserRepository,
} from '@data/repositories';
import {
  AuthStorage,
  IAuthStorage,
  IThemeStorage,
  IUserStorage,
  ThemeStorage,
  UserStorage,
} from '@data/storage';
import { IThemeStore, IUserStore, ThemeStore, UserStore } from '@data/store';
import {
  IAuthRepository,
  ICommentRepository,
  IFileRepository,
  IFollowsRepository,
  ILikeRepository,
  IPostRepository,
  IThemeRepository,
  IUserRepository,
} from '@domain/repositories';
import { combineUseCases } from '@domain/use-cases';
import NavigationService from '@infrastructure/navigation/service';
import type { RootStackParamList } from '@navigation/configuration/routeParams';

import { SinbookHttpClientImpl, RootStorageImpl, SocketManagerImpl } from './implementations';

const container: Container = new Container();

/* -- Api's -- */

container.bind<IAuthApi>(IAuthApi.$).to(AuthApi).inSingletonScope();
container.bind<IUserApi>(IUserApi.$).to(UserApi).inSingletonScope();
container.bind<IPostApi>(IPostApi.$).to(PostApi).inSingletonScope();
container.bind<IFileApi>(IFileApi.$).to(FileApi).inSingletonScope();
container.bind<ICommentApi>(ICommentApi.$).to(CommentApi).inSingletonScope();
container.bind<IFollowsApi>(IFollowsApi.$).to(FollowsApi).inSingletonScope();
container.bind<ILikeApi>(ILikeApi.$).to(LikeApi).inSingletonScope();

/* -- Store's -- */
container.bind<IUserStore>(IUserStore.$).to(UserStore).inSingletonScope();
container.bind<IThemeStore>(IThemeStore.$).to(ThemeStore).inSingletonScope();

/* -- Storage's -- */

container.bind<IAuthStorage>(IAuthStorage.$).to(AuthStorage).inSingletonScope();
container.bind<IUserStorage>(IUserStorage.$).to(UserStorage).inSingletonScope();
container.bind<IThemeStorage>(IThemeStorage.$).to(ThemeStorage).inSingletonScope();

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
container.bind<IThemeRepository>(IThemeRepository.$).to(ThemeRepository).inSingletonScope();
container.bind<IPostRepository>(IPostRepository.$).to(PostRepository).inSingletonScope();
container.bind<IFileRepository>(IFileRepository.$).to(FileRepository).inSingletonScope();
container.bind<ICommentRepository>(ICommentRepository.$).to(CommentRepository).inSingletonScope();
container.bind<IFollowsRepository>(IFollowsRepository.$).to(FollowsRepository).inSingletonScope();
container.bind<ILikeRepository>(ILikeRepository.$).to(LikeRepository).inSingletonScope();

/* -- Use Cases -- */

combineUseCases(container);

export default container;
