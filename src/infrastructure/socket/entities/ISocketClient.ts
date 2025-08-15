export interface ISocketClient<T> {
  instance?: T;

  onConnect: () => void;
  onListen: (event: string) => void;
  onEmit: (event: string) => void;
  onDisconnect: () => void;
  onError: () => void;
}
