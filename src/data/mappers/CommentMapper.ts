import { ICommentResponseDto, IPaginationResponseDto } from '@data/dto/response';
import { CommentEntity, PaginationEntity } from '@domain/entities';

import PaginationMapper from './PaginationMapper';
import UserMapper from './UserMapper';

const CommentMapper = {
  toEntity(dto: ICommentResponseDto): CommentEntity {
    return new CommentEntity({
      id: dto.id,
      content: dto.content,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      user: UserMapper.toEntity(dto.user),
      postId: dto.postId,
    });
  },

  toPage(dto: IPaginationResponseDto<ICommentResponseDto>): PaginationEntity<CommentEntity> {
    return PaginationMapper.toEntity(dto, CommentMapper.toEntity);
  },
};

export default CommentMapper;
