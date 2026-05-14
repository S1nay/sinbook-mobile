import { ReactElement, RefObject } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { IMeta } from '@domain/models';

export interface GridProps<T>
  extends Omit<
    FlatListProps<T>,
    | 'renderItem'
    | 'refreshing'
    | 'ListEmptyComponent'
    | 'ListFooterComponent'
    | 'ListHeaderComponent'
    | 'ListFooterComponentStyle'
    | 'ListHeaderComponentStyle'
  > {
  numberOfColumns: number;
  gap: number;
  pagination?: IMeta | null;
  onPaginate?: (page: number) => Promise<void>;
  ref: RefObject<FlatList | null>;
  renderItem: GridRenderItem<T>;
  isLoading?: boolean;
  isRefreshing?: boolean;
  placeholder?: ReactElement;
  GridHeaderComponent?: ReactElement;
}

export type GridRenderItem<T> = (info: GridRenderItemInfo<T>) => ReactElement | null;

export type GridRenderItemInfo<T> = {
  item: T;
  style: { width: number; height: number };
};
