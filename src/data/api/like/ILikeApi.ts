import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { ILikeRequestDto } from '@domain/dto';
import { IPost } from '@domain/models';

export interface ILikeApi {
  likePost(dto: ILikeRequestDto): Promise<IHttpResponse<IPost>>;
}

export namespace ILikeApi {
  export const $: ServiceIdentifier<ILikeApi> = Symbol('ILikeApi');
}
