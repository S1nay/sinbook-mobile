import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { usePagination } from '@core/hooks';

import styles from './styles';
import { ListProps } from './types';

const List = <T,>({
  pagination,
  onPaginate,
  onRefresh,
  onEndReached: onEndReachedProp,
  contentContainerStyle,
  isLoading = false,
  isRefreshing = false,
  placeholder,
  ...rest
}: ListProps<T>) => {
  const { theme } = useUnistyles();

  const { isLoadMore, onLoadMore } = usePagination({
    pagination: pagination ?? null,
    onPaginate: onPaginate ?? (() => Promise.resolve()),
  });

  const onEndReached = () => {
    if (!isLoadMore) onLoadMore();
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.3}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      onEndReached={pagination ? onEndReached : onEndReachedProp}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.foreground.primary}
          />
        ) : undefined
      }
      ListEmptyComponent={isLoading && placeholder ? placeholder : null}
      ListFooterComponent={
        isLoadMore ? (
          <ActivityIndicator size="small" color={theme.colors.foreground.primary} />
        ) : undefined
      }
      {...rest}
    />
  );
};

export default List;
