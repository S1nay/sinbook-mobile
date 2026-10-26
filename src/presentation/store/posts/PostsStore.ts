import { injectable } from 'inversify';
import { comparer, makeAutoObservable, observable } from 'mobx';

import { PostEntity } from '@domain/entities';
import { IPost } from '@domain/models';

import { IPostsStore } from './IPostsStore';

@injectable()
class PostsStore implements IPostsStore {
  private posts = observable.map<number, PostEntity>();

  constructor() {
    makeAutoObservable(this);
  }

  get(id: number): IPost | undefined {
    return this.posts.get(id);
  }

  getMany(ids: number[]): IPost[] {
    return ids.reduce<IPost[]>((acc, id) => {
      const post = this.posts.get(id);
      if (post) acc.push(post);
      return acc;
    }, []);
  }

  upsert(data: IPost): IPost {
    const existing = this.posts.get(data.id);

    if (existing) {
      this.applyPatch(existing, data);
      return existing;
    }
    // observability навешиваем на границе стора: доменная сущность остаётся framework-free
    const entity = makeAutoObservable(new PostEntity(data));
    this.posts.set(data.id, entity);
    return entity;
  }

  upsertMany(items: IPost[]): IPost[] {
    return items.map(item => this.upsert(item));
  }

  patch(id: number, partial: Partial<IPost>): void {
    const existing = this.posts.get(id);
    if (existing) this.applyPatch(existing, partial);
  }

  remove(id: number): void {
    this.posts.delete(id);
  }

  clear(): void {
    this.posts.clear();
  }

  // undefined пропускаем, чтобы не затирать поля; структурно равные — чтобы не было лишних ре-рендеров
  private applyPatch(target: PostEntity, patch: Partial<IPost>): void {
    const changedEntries = Object.entries(patch).filter(
      ([key, value]) =>
        value !== undefined && !comparer.structural(target[key as keyof IPost], value),
    );
    if (changedEntries.length) Object.assign(target, Object.fromEntries(changedEntries));
  }
}

export default PostsStore;
