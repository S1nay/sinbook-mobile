import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { IFollowsApi } from '@data/api';
import { IFollowRequestDto } from '@domain/dto';
import { IFollowsRepository } from '@domain/repositories';

@injectable()
class FollowsRepository implements IFollowsRepository {
  constructor(@inject(IFollowsApi.$) private followsApi: IFollowsApi) {}

  async follow(dto: IFollowRequestDto): Promise<void> {
    return this.followsApi
      .follow(dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async unfollow(followingUserId: number): Promise<void> {
    return this.followsApi
      .unfollow(followingUserId)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}

export default FollowsRepository;
