import { useMemo, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  View,
  LayoutChangeEvent,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { GridProps } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Grid = <T,>(props: GridProps<T>) => {
  const {
    gap = 0,
    numberOfColumns = 1,
    renderItem,
    data,
    isLoadMore = false,
    isLoading = false,
    isRefreshing = false,
    placeholder,
    GridHeaderComponent,
    onLoadMore,
    contentContainerStyle,
    style,
    ...restProps
  } = props;

  const { theme } = useUnistyles();
  const [containerWidth, setContainerWidth] = useState<number>(SCREEN_WIDTH);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      if (w && w !== containerWidth) setContainerWidth(w);
    },
    [containerWidth],
  );

  const totalGaps = gap * (numberOfColumns - 1);

  const tileSize = useMemo(() => {
    const available = containerWidth;
    const size = Math.fround((available - totalGaps) / numberOfColumns);
    return size > 0 ? size : 0;
  }, [containerWidth, totalGaps, numberOfColumns]);

  const renderGridItem = ({ item }: ListRenderItemInfo<T>) => {
    const itemStyle = {
      width: tileSize,
      height: tileSize,
    } as const;

    return renderItem?.({ item, style: itemStyle });
  };

  const onEndReached = () => {
    if (!isLoadMore && onLoadMore) onLoadMore();
  };

  return (
    <View onLayout={handleLayout} style={style}>
      <FlatList
        data={data}
        renderItem={renderGridItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{ gap }}
        contentContainerStyle={[{ gap }, contentContainerStyle]}
        numColumns={numberOfColumns}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        refreshing={isRefreshing}
        ListHeaderComponent={GridHeaderComponent ? GridHeaderComponent : null}
        ListEmptyComponent={isLoading && placeholder ? placeholder : null}
        ListFooterComponent={
          isLoadMore ? (
            <ActivityIndicator size="small" color={theme.colors.foreground.primary} />
          ) : null
        }
        {...restProps}
      />
    </View>
  );
};

export default Grid;
