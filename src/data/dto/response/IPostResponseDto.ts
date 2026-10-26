import { IUserResponseDto } from './IUserResponseDto';

export interface IPostResponseDto {
  id: number;
  content: string;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  user: IUserResponseDto;
  likes: Array<number>;
  commentsCount: number;
}
