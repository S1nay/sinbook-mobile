import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useUnistyles } from 'react-native-unistyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 3;
const GAP = 2;
const SIZE = SCREEN_WIDTH / NUMBER_OF_COLUMNS - NUMBER_OF_COLUMNS;

const GridPlaceholder = () => {
  const { theme } = useUnistyles();

  const renderPlaceholders = (item: number, index: number) => (
    <SkeletonPlaceholder.Item key={item + index} width={SIZE} height={SIZE} />
  );

  return (
    <SkeletonPlaceholder backgroundColor={theme.colors.background.secondary}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        gap={GAP}
        flexWrap="wrap"
        justifyContent="center"
      >
        {new Array(9).fill(1).map(renderPlaceholders)}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default GridPlaceholder;
