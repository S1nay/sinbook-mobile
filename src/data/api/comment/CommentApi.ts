import { inject, injectable } from 'inversify';

import { Identifiers } from '@core/di/identifiers';
import { IHttpClient, IHttpResponse } from '@core/interfaces/http';
import { ICreateCommentRequestDto, IPatchCommentRequestDto } from '@domain/dto';
import { IComment, IPagination } from '@domain/models';
import { GetCommentsRequestParams } from '@domain/request-params';

import { ICommentApi } from './ICommentApi';

@injectable()
class CommentApi implements ICommentApi {
  constructor(@inject(Identifiers.SinbookHttpClient) private readonly httpClient: IHttpClient) {}

  getPostComments(params: GetCommentsRequestParams): Promise<IHttpResponse<IPagination<IComment>>> {
    return this.httpClient.get<IPagination<IComment>>('/comment', { params });
  }

  createComment(postId: number, dto: ICreateCommentRequestDto): Promise<IHttpResponse<IComment>> {
    return this.httpClient.post<IComment, ICreateCommentRequestDto>('/comment', dto, {
      params: { postId },
    });
  }

  updateComment(id: number, dto: IPatchCommentRequestDto): Promise<IHttpResponse<IComment>> {
    return this.httpClient.patch<IComment, IPatchCommentRequestDto>(`/comment/${id}`, dto);
  }

  deleteComment(id: number): Promise<IHttpResponse<void>> {
    return this.httpClient.delete(`/comment/${id}`);
  }
}

export default CommentApi;
