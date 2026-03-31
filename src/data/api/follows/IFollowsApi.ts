import { ServiceIdentifier } from 'inversify';

import { IHttpResponse } from '@core/interfaces/http';
import { IFollowRequestDto } from '@domain/dto';

export interface IFollowsApi {
  follow(dto: IFollowRequestDto): Promise<IHttpResponse<void>>;
  unfollow(followingUserId: number): Promise<IHttpResponse<void>>;
}

export namespace IFollowsApi {
  export const $: ServiceIdentifier<IFollowsApi> = Symbol('IFollowsApi');
}
