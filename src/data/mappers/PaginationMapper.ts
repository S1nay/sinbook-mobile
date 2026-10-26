import { IPaginationResponseDto } from '@data/dto/response';
import { PaginationEntity } from '@domain/entities';

import MetaMapper from './MetaMapper';

const PaginationMapper = {
  // Переводит страницу DTO в PaginationEntity, маппя каждый элемент переданной функцией.
  toEntity<D, E>(dto: IPaginationResponseDto<D>, mapItem: (item: D) => E): PaginationEntity<E> {
    return new PaginationEntity<E>(dto.results.map(mapItem), MetaMapper.toEntity(dto.meta));
  },
};

export default PaginationMapper;
