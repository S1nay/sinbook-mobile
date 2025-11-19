import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Colors } from '@shared/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 3;
const GAP = 5;
const SIZE = SCREEN_WIDTH / NUMBER_OF_COLUMNS - NUMBER_OF_COLUMNS * GAP;

const GridPlaceholder = () => {
  const renderPlaceholders = (item: number, index: number) => (
    <SkeletonPlaceholder.Item key={item + index} width={SIZE} height={SIZE} />
  );

  return (
    <SkeletonPlaceholder backgroundColor={Colors.secondaryWhite}>
      <SkeletonPlaceholder.Item flexDirection="row" gap={GAP} flexWrap="wrap">
        {new Array(9).fill(1).map(renderPlaceholders)}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default GridPlaceholder;
