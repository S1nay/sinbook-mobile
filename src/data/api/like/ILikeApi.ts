import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IPostResponseDto } from '@data/dto/response';
import { ILikeRequestDto } from '@domain/dto';

export interface ILikeApi {
  likePost(dto: ILikeRequestDto): Promise<IHttpResponse<IPostResponseDto>>;
}

export namespace ILikeApi {
  export const $: ServiceIdentifier<ILikeApi> = Symbol('ILikeApi');
}
