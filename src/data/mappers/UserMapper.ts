import { IPaginationResponseDto, IUserResponseDto } from '@data/dto/response';
import { PaginationEntity, UserEntity } from '@domain/entities';

import PaginationMapper from './PaginationMapper';

const UserMapper = {
  toEntity(dto: IUserResponseDto): UserEntity {
    return new UserEntity({
      id: dto.id,
      nickName: dto.nickName,
      biography: dto.biography,
      avatarPath: dto.avatarPath,
      name: dto.name,
      email: dto.email,
      isDeleted: dto.isDeleted,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      followersCount: dto.followersCount,
      followsCount: dto.followsCount,
      postsCount: dto.postsCount,
      mutualFollow: dto.mutualFollow,
    });
  },

  toPage(dto: IPaginationResponseDto<IUserResponseDto>): PaginationEntity<UserEntity> {
    return PaginationMapper.toEntity(dto, UserMapper.toEntity);
  },
};

export default UserMapper;
