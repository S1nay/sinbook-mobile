import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { injectable } from 'inversify';

import { IHttpClient, IHttpConfig, IHttpRequestConfig, IHttpResponse } from '../entities';

@injectable()
class AxiosHttpClient implements IHttpClient<AxiosInstance> {
  private axios: AxiosInstance;

  get instance(): AxiosInstance {
    return this.axios;
  }

  constructor(config: IHttpConfig) {
    this.axios = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
    });

    axios.interceptors.response.use(
      response => response,
      async error => {
        return this.axios(error.config);
      },
    );
  }

  get<T>(url: string, config?: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    return this.response<T>(this.axios.get<T>(url, config));
  }

  post<T, D>(url: string, data?: D, config?: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    return this.response<T>(this.axios.post<T>(url, data, config));
  }

  put<T, D>(url: string, data?: D, config?: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    return this.response<T>(this.axios.put<T>(url, data, config));
  }

  delete<T>(url: string, config?: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    return this.response<T>(this.axios.delete<T>(url, config));
  }

  updateHeaders(headers: Record<string, string>) {
    this.axios.defaults.headers.common = {
      ...this.axios.defaults.headers.common,
      ...headers,
    };
  }

  private async response<T>(request: Promise<AxiosResponse<T>>): Promise<IHttpResponse<T>> {
    let response: IHttpResponse<T> = {};

    try {
      const data = await request;

      response = {
        data: data.data,
        status: data.status,
      };
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        response.status = e.status;

        if (e.response) {
          response.data = e.response.data as T;
        }
      }
    }

    return response;
  }
}

export default AxiosHttpClient;
