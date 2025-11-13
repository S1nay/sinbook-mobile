export interface IHttpError {
  message: ApiErrorMessage;
  error: string;
  status: number;
  path: string;
}
