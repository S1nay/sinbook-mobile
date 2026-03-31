import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpClient, IHttpResponse } from '@core/interfaces/http';
import { ILikeRequestDto } from '@domain/dto';

import { ILikeApi } from './ILikeApi';

@injectable()
class LikeApi implements ILikeApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}

  likePost(dto: ILikeRequestDto): Promise<IHttpResponse<void>> {
    return this.httpClient.post<void, ILikeRequestDto>('/like', dto);
  }
}

export default LikeApi;
