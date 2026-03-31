import { ServiceIdentifier } from 'inversify';

import { ILikeRequestDto } from '@domain/dto';

export interface ILikeRepository {
  likePost(dto: ILikeRequestDto): Promise<void>;
}

export namespace ILikeRepository {
  export const $: ServiceIdentifier<ILikeRepository> = Symbol('ILikeRepository');
}
