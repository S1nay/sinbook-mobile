import { injectable } from 'inversify';
import { makeAutoObservable, observable } from 'mobx';

import { PostModel } from '@data/models';
import { IPost } from '@domain/models';

import { IPostsStore } from './IPostsStore';

@injectable()
class PostsStore implements IPostsStore {
  private posts = observable.map<number, PostModel>();

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
      existing.applyPatch(data);
      return existing;
    }
    const model = new PostModel(data);
    this.posts.set(data.id, model);
    return model;
  }

  upsertMany(items: IPost[]): IPost[] {
    return items.map(item => this.upsert(item));
  }

  patch(id: number, partial: Partial<IPost>): void {
    this.posts.get(id)?.applyPatch(partial);
  }

  remove(id: number): void {
    this.posts.delete(id);
  }

  clear(): void {
    this.posts.clear();
  }
}

export default PostsStore;
