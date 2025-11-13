import { IHttpHeaders } from './IHttpHeaders';

export interface IHttpConfig {
  baseUrl?: string;
  headers?: IHttpHeaders;
  timeout?: number;
}
