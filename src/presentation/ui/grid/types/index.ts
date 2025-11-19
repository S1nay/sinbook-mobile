import { ReactElement } from 'react';
import { FlatListProps } from 'react-native';

export interface GridProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  numberOfColumns: number;
  gap: number;
  renderItem: GridRenderItem<T>;
  onLoadMore?: () => void;
  isLoadMore?: boolean;
}

export type GridRenderItem<T> = (info: GridRenderItemInfo<T>) => ReactElement | null;

export type GridRenderItemInfo<T> = {
  item: T;
  style: { width: number; height: number };
};
