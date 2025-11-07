import { Dimensions, FlatList, ListRenderItemInfo } from 'react-native';

import { GridProps } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Grid = <T,>(props: GridProps<T>) => {
  const { gap, numberOfColumns, renderItem, data } = props;

  const tileSize = SCREEN_WIDTH / numberOfColumns - numberOfColumns * gap;

  const renderGridItem = ({ item }: ListRenderItemInfo<T>) => {
    return renderItem?.({ item, style: { width: tileSize, height: tileSize } });
  };

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={{ gap }}
      scrollEnabled={false}
      numColumns={numberOfColumns}
    />
  );
};

export default Grid;
