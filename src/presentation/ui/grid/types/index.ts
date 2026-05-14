import { ReactElement, RefObject } from 'react';
import { FlatList, FlatListProps } from 'react-native';

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
  ref: RefObject<FlatList | null>;
  renderItem: GridRenderItem<T>;
  onLoadMore?: () => void;
  isLoadMore?: boolean;
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
