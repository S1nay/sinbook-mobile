import { IMeta } from './IMeta';

export interface IPagination<T> {
  results: Array<T>;
  meta: IMeta;
}
