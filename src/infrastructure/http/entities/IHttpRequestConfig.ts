import { IHttpHeaders } from './IHttpHeaders';

export interface IHttpRequestConfig {
  headers?: IHttpHeaders;
  params?: Record<string, unknown>;
  baseURL?: string;
}
