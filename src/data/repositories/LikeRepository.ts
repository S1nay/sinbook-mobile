import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { ILikeApi } from '@data/api';
import { PostMapper } from '@data/mappers';
import { ILikeRequestDto } from '@domain/dto';
import { IPost } from '@domain/models';
import { ILikeRepository } from '@domain/repositories';

@injectable()
class LikeRepository implements ILikeRepository {
  constructor(@inject(ILikeApi.$) private likeApi: ILikeApi) {}

  async likePost(dto: ILikeRequestDto): Promise<IPost> {
    return this.likeApi
      .likePost(dto)
      .then(getDataFromHttpResponse)
      .then(post => PostMapper.toEntity(post))
      .catch(getErrorFromHttpResponse);
  }
}

export default LikeRepository;
