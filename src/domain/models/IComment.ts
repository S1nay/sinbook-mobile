import { IUser } from './IUser';

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  postId: number;
}
