export interface GetUsersRequestParams extends Record<string, unknown> {
  page?: number;
  perPage?: number;
  search?: string;
  follows?: boolean;
  followers?: boolean;
}
