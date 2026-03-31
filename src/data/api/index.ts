import AuthApi, { IAuthApi } from './auth';
import CommentApi, { ICommentApi } from './comment';
import FileApi, { IFileApi } from './file';
import FollowsApi, { IFollowsApi } from './follows';
import LikeApi, { ILikeApi } from './like';
import PostApi, { IPostApi } from './post';
import UserApi, { IUserApi } from './user';

export { AuthApi, UserApi, PostApi, FileApi, CommentApi, FollowsApi, LikeApi };

export { IAuthApi, IUserApi, IPostApi, IFileApi, ICommentApi, IFollowsApi, ILikeApi };
