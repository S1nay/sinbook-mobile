import { Socket } from 'socket.io-client';

import { ISocketClient } from './ISocketClient';
import { ISocketConfig } from './ISocketConfig';
import { SocketConnectionPaths } from './socketConnectionPaths';

export interface ISocketManager {
  register(path: SocketConnectionPaths, config: Omit<ISocketConfig, 'baseUrl' | 'path'>): void;
  get(name: string): ISocketClient<Socket> | undefined;
  disconnectAll(): void;
}
