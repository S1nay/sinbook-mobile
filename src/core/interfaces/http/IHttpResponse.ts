/**
 * ответ от сервера
 * */
export interface IHttpResponse<T> {
  data: T;
  status?: number;
  errors?: unknown;
  message?: string;
}
