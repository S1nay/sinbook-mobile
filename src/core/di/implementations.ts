import EnvConfig from 'react-native-config';
import { Mode } from 'react-native-mmkv';

import HttpClients from '@infrastructure/http';
import SocketManager from '@infrastructure/socket';
import Storages from '@infrastructure/storage/storages';

const SinbookHttpClientImpl = new HttpClients.AxiosHttpClient({
  baseUrl: EnvConfig.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

const RootStorageImpl = new Storages.MMKVStorage({
  id: EnvConfig.STORAGE_ID ?? '',
  mode: Mode.SINGLE_PROCESS,
  encryptionKey: EnvConfig.STORAGE_ENCRYPTION_KEY,
  readOnly: false,
  path: './',
});

const SocketManagerImpl = new SocketManager(EnvConfig.API_URL?.slice(0, -4));

export { SinbookHttpClientImpl, RootStorageImpl, SocketManagerImpl };
