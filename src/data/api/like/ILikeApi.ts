import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { ILikeRequestDto } from '@domain/dto';

export interface ILikeApi {
  likePost(dto: ILikeRequestDto): Promise<IHttpResponse<void>>;
}

export namespace ILikeApi {
  export const $: ServiceIdentifier<ILikeApi> = Symbol('ILikeApi');
}
