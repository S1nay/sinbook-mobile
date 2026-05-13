import { FlatListProps } from 'react-native';

import { IMeta } from '@domain/models';

export interface ListProps<T> extends Omit<FlatListProps<T>, 'onRefresh' | 'refreshing'> {
  pagination?: IMeta | null;
  onPaginate?: (page: number) => Promise<void>;
  onRefresh?: () => Promise<void>;
}
