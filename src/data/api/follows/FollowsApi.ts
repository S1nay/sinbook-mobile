import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpClient, IHttpResponse } from '@core/interfaces/http';
import { IFollowRequestDto } from '@domain/dto';

import { IFollowsApi } from './IFollowsApi';

@injectable()
class FollowsApi implements IFollowsApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}

  follow(dto: IFollowRequestDto): Promise<IHttpResponse<void>> {
    return this.httpClient.post<void, IFollowRequestDto>('/follows', dto);
  }

  unfollow(followingUserId: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/follows/${followingUserId}`);
  }
}

export default FollowsApi;
