import { IUser } from './IUser';

export interface IPost {
  id: number;
  content: string;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  likes: Array<number>;
  commentsCount: number;
}
