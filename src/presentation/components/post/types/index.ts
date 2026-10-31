import { IPost } from '@domain/models';

export interface PostProps {
  post: IPost;
  currentUserId: number | null;
  onLike: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export type PostActionsSheetProps = Pick<PostProps, 'onEdit' | 'onDelete'> & {
  postId: number;
};

export type PostLikeButtonProps = Pick<PostProps, 'post' | 'currentUserId' | 'onLike'>;
