import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { ILikeApi } from '@data/api';
import { ILikeRequestDto } from '@domain/dto';
import { ILikeRepository } from '@domain/repositories';

@injectable()
class LikeRepository implements ILikeRepository {
  constructor(@inject(ILikeApi.$) private likeApi: ILikeApi) {}

  async likePost(dto: ILikeRequestDto): Promise<void> {
    return this.likeApi
      .likePost(dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}

export default LikeRepository;
