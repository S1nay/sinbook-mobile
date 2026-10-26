import { IMetaResponseDto } from './IMetaResponseDto';

export interface IPaginationResponseDto<T> {
  results: Array<T>;
  meta: IMetaResponseDto;
}
