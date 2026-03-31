import { ServiceIdentifier } from 'inversify';

import { IFollowRequestDto } from '@domain/dto';

export interface IFollowsRepository {
  follow(dto: IFollowRequestDto): Promise<void>;
  unfollow(followingUserId: number): Promise<void>;
}

export namespace IFollowsRepository {
  export const $: ServiceIdentifier<IFollowsRepository> = Symbol('IFollowsRepository');
}
