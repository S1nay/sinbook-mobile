import { IUser } from '@domain/models';

class UserEntity implements IUser {
  id: number;
  nickName: string;
  biography: string;
  avatarPath: string | null;
  name: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  mutualFollow?: boolean;

  constructor(data: IUser) {
    this.id = data.id;
    this.nickName = data.nickName;
    this.biography = data.biography;
    this.avatarPath = data.avatarPath;
    this.name = data.name;
    this.email = data.email;
    this.isDeleted = data.isDeleted;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.followersCount = data.followersCount;
    this.followsCount = data.followsCount;
    this.postsCount = data.postsCount;
    this.mutualFollow = data.mutualFollow;
  }
}

export default UserEntity;
