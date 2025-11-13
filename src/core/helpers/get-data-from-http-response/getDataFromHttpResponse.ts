import { IHttpResponse } from '@core/interfaces/http';

const getDataFromHttpResponse = <T = unknown>(response: IHttpResponse<T>) => response.data;

export default getDataFromHttpResponse;
