import { IPost, IUser } from '@domain/models';

class PostEntity implements IPost {
  id: number;
  content: string;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  likes: Array<number>;
  commentsCount: number;

  constructor(data: IPost) {
    this.id = data.id;
    this.content = data.content;
    this.images = data.images;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.user = data.user;
    this.likes = data.likes;
    this.commentsCount = data.commentsCount;
  }

  isLikedBy(userId: number): boolean {
    return this.likes.includes(userId);
  }

  // Чистые хелперы: возвращают новый массив likes, не мутируя сущность.
  // Запись в стор делает presentation-слой.
  withLike(userId: number): Array<number> {
    return this.isLikedBy(userId) ? this.likes : [...this.likes, userId];
  }

  withoutLike(userId: number): Array<number> {
    return this.likes.filter(id => id !== userId);
  }
}

export default PostEntity;
