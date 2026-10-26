import { comparer, makeAutoObservable } from 'mobx';

import { IPost, IUser } from '@domain/models';

class PostModel implements IPost {
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
    makeAutoObservable(this);
  }

  applyPatch(patch: Partial<IPost>): void {
    // undefined-значения пропускаем, чтобы не затирать существующие поля;
    // структурно равные — тоже, чтобы новые ссылки с тем же содержимым не вызывали ре-рендер
    const changedEntries = Object.entries(patch).filter(
      ([key, value]) =>
        value !== undefined && !comparer.structural(this[key as keyof IPost], value),
    );
    if (changedEntries.length) Object.assign(this, Object.fromEntries(changedEntries));
  }
}

export default PostModel;
