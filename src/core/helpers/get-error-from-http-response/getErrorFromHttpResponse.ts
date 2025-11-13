import { AxiosError } from 'axios';

import { IHttpError } from '@core/interfaces/http';

const getErrorFromHttpResponse = (error: AxiosError<IHttpError>) =>
  Promise.reject(error.response?.data);

export default getErrorFromHttpResponse;
