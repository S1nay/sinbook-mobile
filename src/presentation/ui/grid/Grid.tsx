import { Dimensions, FlatList, ListRenderItemInfo } from 'react-native';

import { GridProps } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Grid = <T,>(props: GridProps<T>) => {
  const {
    gap,
    numberOfColumns,
    renderItem,
    data,
    isLoadMore = false,
    onLoadMore,
    ...restProps
  } = props;

  const tileSize = SCREEN_WIDTH / numberOfColumns - numberOfColumns * gap;

  const renderGridItem = ({ item }: ListRenderItemInfo<T>) => {
    return renderItem?.({ item, style: { width: tileSize, height: tileSize } });
  };

  const onEndReached = () => {
    if (!isLoadMore && onLoadMore) onLoadMore();
  };

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      columnWrapperStyle={{ gap }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap }}
      numColumns={numberOfColumns}
      onEndReachedThreshold={0.3}
      onEndReached={onEndReached}
      {...restProps}
    />
  );
};

export default Grid;
