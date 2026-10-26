import { IComment, IUser } from '@domain/models';

class CommentEntity implements IComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  postId: number;

  constructor(data: IComment) {
    this.id = data.id;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.user = data.user;
    this.postId = data.postId;
  }
}

export default CommentEntity;
