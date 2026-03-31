import { injectable } from 'inversify';
import { Socket } from 'socket.io-client';

import {
  ISocketClient,
  ISocketConfig,
  ISocketManager,
  SocketConnectionPaths,
} from '@core/interfaces/socket';
import WebSocketClients from '@infrastructure/socket/clients';

@injectable()
class SocketManager implements ISocketManager {
  private _sockets: Map<SocketConnectionPaths, ISocketClient<Socket>> = new Map();
  private _baseUrl: string = '';

  constructor(baseUrl?: string) {
    this._baseUrl = baseUrl ?? '';
  }

  register(path: SocketConnectionPaths, config: Omit<ISocketConfig, 'baseUrl' | 'path'>): void {
    const socket = new WebSocketClients.WebSocketIOClient({
      ...config,
      path,
      baseUrl: this._baseUrl,
    });

    this._sockets.set(path, socket);
  }

  get(name: SocketConnectionPaths): ISocketClient<Socket> | undefined {
    return this._sockets.get(name);
  }

  disconnectAll(): void {
    this._sockets.forEach(socket => socket.disconnect());
  }
}

export default SocketManager;
