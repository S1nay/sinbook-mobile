import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

import type { ISocketClient, ISocketConfig } from '../entities';

class WebSocketIOClient implements ISocketClient<Socket> {
  instance: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(config?: ISocketConfig) {
    this.instance = io(config?.baseUrl, {
      extraHeaders: config?.headers,
      timeout: config?.timeout,
      transports: config?.transports,
      autoConnect: false,
    });
  }
  onConnect: () => void;
  onListen: (event: string) => void;
  onEmit: (event: string) => void;
  onDisconnect: () => void;
  onError: () => void;
}

export default WebSocketIOClient;
