export interface IHttpError {
  message: string | Array<{ field: string; error: string }>;
  error: string;
  status: number;
  path: string;
}
