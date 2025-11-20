import EnvConfig from 'react-native-config';
import { Mode } from 'react-native-mmkv';

import { getCorrectUrl } from '@core/helpers';
import HttpClients from '@infrastructure/http/clients';
import SocketManager from '@infrastructure/socket/manager';
import Storages from '@infrastructure/storage/storages';

const SinbookHttpClientImpl = new HttpClients.AxiosHttpClient({
  baseUrl: getCorrectUrl(EnvConfig.API_URL),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

const RootStorageImpl = new Storages.MMKVStorage({
  id: EnvConfig.STORAGE_ID!,
  mode: Mode.SINGLE_PROCESS,
  encryptionKey: EnvConfig.STORAGE_ENCRYPTION_KEY,
  readOnly: false,
});

const SocketManagerImpl = new SocketManager(EnvConfig.API_URL?.slice(0, -4));

export { SinbookHttpClientImpl, RootStorageImpl, SocketManagerImpl };
