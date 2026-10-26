import { IUserResponseDto } from './IUserResponseDto';

export interface ICommentResponseDto {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: IUserResponseDto;
  postId: number;
}
