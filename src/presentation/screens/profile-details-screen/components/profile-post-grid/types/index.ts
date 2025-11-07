import { IMeta, IPost } from '@domain/models';

export interface ProfilePostGridProps {
  posts: Array<IPost>;
  postsMeta: IMeta;
}
