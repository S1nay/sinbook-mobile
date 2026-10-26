import { IPagination } from '@domain/models';

import MetaEntity from './MetaEntity';

class PaginationEntity<T> implements IPagination<T> {
  results: Array<T>;
  meta: MetaEntity;

  constructor(results: Array<T>, meta: MetaEntity) {
    this.results = results;
    this.meta = meta;
  }
}

export default PaginationEntity;
