import { IMeta } from '@domain/models';

class MetaEntity implements IMeta {
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;

  constructor(data: IMeta) {
    this.totalItems = data.totalItems;
    this.totalPages = data.totalPages;
    this.page = data.page;
    this.perPage = data.perPage;
  }
}

export default MetaEntity;
