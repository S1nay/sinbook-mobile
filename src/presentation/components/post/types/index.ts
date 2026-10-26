import { IPost } from '@domain/models';

export interface PostProps {
  post: IPost;
  currentUserId: number | null;
  onLike: (id: number) => void;
}
