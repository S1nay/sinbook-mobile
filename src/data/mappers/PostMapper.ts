import { IPaginationResponseDto, IPostResponseDto } from '@data/dto/response';
import { PaginationEntity, PostEntity } from '@domain/entities';

import PaginationMapper from './PaginationMapper';
import UserMapper from './UserMapper';

const PostMapper = {
  toEntity(dto: IPostResponseDto): PostEntity {
    return new PostEntity({
      id: dto.id,
      content: dto.content,
      images: dto.images,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      user: UserMapper.toEntity(dto.user),
      likes: dto.likes,
      commentsCount: dto.commentsCount,
    });
  },

  toPage(dto: IPaginationResponseDto<IPostResponseDto>): PaginationEntity<PostEntity> {
    return PaginationMapper.toEntity(dto, PostMapper.toEntity);
  },
};

export default PostMapper;
