import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

import {
  type ISocketClient,
  type ISocketConfig,
  SocketDefaultEvents,
} from '@core/interfaces/socket';

class WebSocketIOClient implements ISocketClient<Socket> {
  private _instance: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  get instance(): Socket<DefaultEventsMap, DefaultEventsMap> | null {
    return this._instance;
  }

  constructor(config?: ISocketConfig) {
    this._instance = io(`${config?.baseUrl}/${config?.path}`, {
      extraHeaders: config?.headers,
      timeout: config?.timeout,
      transports: config?.transports,
      autoConnect: false,
    });
  }

  connect(authToken: string) {
    if (this._instance) {
      this._instance.auth = { token: authToken };
      this._instance?.connect();
    }
  }

  disconnect() {
    this._instance?.disconnect();
  }

  emit<T>(event: string, payload: T) {
    this._instance?.emit(event, payload);
  }

  onListen(event: string, listener: () => void) {
    this._instance?.on(event, listener);
  }

  onConnect(listener: () => void) {
    this._instance?.on(SocketDefaultEvents.CONNECT, listener);
  }

  onDisconnect(listener: () => void) {
    this._instance?.on(SocketDefaultEvents.DISCONNECT, listener);
  }

  onError(listener: (error: Error) => void) {
    this._instance?.on(SocketDefaultEvents.ERROR, listener);
  }
}

export default WebSocketIOClient;
