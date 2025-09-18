import { IHttpResponse } from '@infrastructure/http/entities';

const getDataFromHttpResponse = <T = unknown>(response: IHttpResponse<T>) => response.data;

export default getDataFromHttpResponse;
