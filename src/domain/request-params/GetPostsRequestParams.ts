export interface GetPostsRequestParams extends Record<string, unknown> {
  userId?: number;
  page?: number;
  perPage?: number;
  search?: string;
  followingBy?: boolean;
}
