export interface GetCommentsRequestParams extends Record<string, unknown> {
  postId: number;
  page?: number;
  perPage?: number;
}
