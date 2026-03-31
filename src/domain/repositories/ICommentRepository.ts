import { ServiceIdentifier } from 'inversify';

import { ICreateCommentRequestDto, IPatchCommentRequestDto } from '@domain/dto';
import { IComment, IPagination } from '@domain/models';
import { GetCommentsRequestParams } from '@domain/request-params';

export interface ICommentRepository {
  getPostComments(params: GetCommentsRequestParams): Promise<IPagination<IComment>>;
  createComment(postId: number, dto: ICreateCommentRequestDto): Promise<IComment>;
  updateComment(id: number, dto: IPatchCommentRequestDto): Promise<IComment>;
  deleteComment(id: number): Promise<void>;
}

export namespace ICommentRepository {
  export const $: ServiceIdentifier<ICommentRepository> = Symbol('ICommentRepository');
}
