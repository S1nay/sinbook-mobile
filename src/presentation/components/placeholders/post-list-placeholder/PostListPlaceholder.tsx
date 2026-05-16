import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useUnistyles } from 'react-native-unistyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_COUNT = 3;

const PostListPlaceholder = () => {
  const { theme } = useUnistyles();

  const renderPost = (_: number, index: number) => (
    <SkeletonPlaceholder.Item key={index} paddingVertical={16} gap={12}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={16}
      >
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={8}>
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={100} />
          <SkeletonPlaceholder.Item gap={4}>
            <SkeletonPlaceholder.Item width={100} height={13} />
            <SkeletonPlaceholder.Item width={70} height={11} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} />
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item width={SCREEN_WIDTH - 32} height={14} marginHorizontal={16} />

      <SkeletonPlaceholder.Item width={SCREEN_WIDTH} height={SCREEN_WIDTH} />

      <SkeletonPlaceholder.Item flexDirection="row" gap={18} paddingHorizontal={16}>
        <SkeletonPlaceholder.Item width={40} height={16} />
        <SkeletonPlaceholder.Item width={40} height={16} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );

  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={theme.colors.background.secondary}>
      <SkeletonPlaceholder.Item>
        {new Array(ITEM_COUNT).fill(null).map(renderPost)}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default PostListPlaceholder;
