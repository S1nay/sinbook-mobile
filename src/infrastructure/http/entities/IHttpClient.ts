import { IHttpRequestConfig } from './IHttpRequestConfig';
import { IHttpResponse } from './IHttpResponse';

export interface IHttpClient<I = unknown> {
  instance?: I;
  get: <T = unknown>(url: string, config?: IHttpRequestConfig) => Promise<IHttpResponse<T>>;
  post: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: IHttpRequestConfig,
  ) => Promise<IHttpResponse<T>>;
  put: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: IHttpRequestConfig,
  ) => Promise<IHttpResponse<T>>;
  delete: <T = unknown>(url: string, config?: IHttpRequestConfig) => Promise<IHttpResponse<T>>;
  updateHeaders: (headers: Record<string, string>) => void;
}
