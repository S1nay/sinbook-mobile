export interface ISocketClient<T = unknown> {
  instance: T | null;

  connect(authToken: string): void;
  disconnect(): void;
  emit<T>(event: string, payload: T): void;

  onListen(event: string, listener: () => void): void;
  onDisconnect(listener: () => void): void;
  onConnect(listener: () => void): void;
  onError(listener: (error: Error) => void): void;
}
