import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { ICreateCommentRequestDto, IPatchCommentRequestDto } from '@domain/dto';
import { IComment, IPagination } from '@domain/models';
import { GetCommentsRequestParams } from '@domain/request-params';

export interface ICommentApi {
  getPostComments(params: GetCommentsRequestParams): Promise<IHttpResponse<IPagination<IComment>>>;
  createComment(postId: number, dto: ICreateCommentRequestDto): Promise<IHttpResponse<IComment>>;
  updateComment(id: number, dto: IPatchCommentRequestDto): Promise<IHttpResponse<IComment>>;
  deleteComment(id: number): Promise<IHttpResponse<void>>;
}

export namespace ICommentApi {
  export const $: ServiceIdentifier<ICommentApi> = Symbol('ICommentApi');
}
