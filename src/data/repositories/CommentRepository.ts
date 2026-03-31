import { inject, injectable } from 'inversify';

import { getDataFromHttpResponse, getErrorFromHttpResponse } from '@core/helpers';
import { ICommentApi } from '@data/api';
import { ICreateCommentRequestDto, IPatchCommentRequestDto } from '@domain/dto';
import { IComment, IPagination } from '@domain/models';
import { ICommentRepository } from '@domain/repositories';
import { GetCommentsRequestParams } from '@domain/request-params';

@injectable()
class CommentRepository implements ICommentRepository {
  constructor(@inject(ICommentApi.$) private commentApi: ICommentApi) {}

  async getPostComments(params: GetCommentsRequestParams): Promise<IPagination<IComment>> {
    return this.commentApi
      .getPostComments(params)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async createComment(postId: number, dto: ICreateCommentRequestDto): Promise<IComment> {
    return this.commentApi
      .createComment(postId, dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async updateComment(id: number, dto: IPatchCommentRequestDto): Promise<IComment> {
    return this.commentApi
      .updateComment(id, dto)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }

  async deleteComment(id: number): Promise<void> {
    return this.commentApi
      .deleteComment(id)
      .then(getDataFromHttpResponse)
      .catch(getErrorFromHttpResponse);
  }
}

export default CommentRepository;
