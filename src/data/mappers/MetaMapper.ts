import { IMetaResponseDto } from '@data/dto/response';
import { MetaEntity } from '@domain/entities';

const MetaMapper = {
  toEntity(dto: IMetaResponseDto): MetaEntity {
    return new MetaEntity({
      totalItems: dto.totalItems,
      totalPages: dto.totalPages,
      page: dto.page,
      perPage: dto.perPage,
    });
  },
};

export default MetaMapper;
