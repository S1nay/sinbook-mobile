import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { usePagination } from '@core/hooks';

import styles from './styles';
import { ListProps } from './types';

const List = <T,>({
  pagination,
  onPaginate,
  onRefresh: onRefreshProp,
  onEndReached: onEndReachedProp,
  contentContainerStyle,
  isLoading = false,
  placeholder,
  ...rest
}: ListProps<T>) => {
  const { theme } = useUnistyles();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoadMore, onLoadMore } = usePagination({
    pagination: pagination ?? null,
    onPaginate: onPaginate ?? (() => Promise.resolve()),
  });

  const onEndReached = () => {
    if (!isLoadMore) onLoadMore();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefreshProp?.();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.3}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      onEndReached={pagination ? onEndReached : onEndReachedProp}
      refreshControl={
        onRefreshProp ? (
          <RefreshControl
            refreshing={refreshing}
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
