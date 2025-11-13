import { ISocketHeaders } from './ISocketHeaders';

export interface ISocketConfig {
  baseUrl?: string;
  headers?: ISocketHeaders;
  timeout?: number;
  transports: ('polling' | 'websocket' | 'webtransport')[];
  path: string;
}
