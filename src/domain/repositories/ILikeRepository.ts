import { ServiceIdentifier } from 'inversify';

import { ILikeRequestDto } from '@domain/dto';
import { IPost } from '@domain/models';

export interface ILikeRepository {
  likePost(dto: ILikeRequestDto): Promise<IPost>;
}

export namespace ILikeRepository {
  export const $: ServiceIdentifier<ILikeRepository> = Symbol('ILikeRepository');
}
