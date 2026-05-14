import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useUnistyles } from 'react-native-unistyles';

const ITEM_COUNT = 6;

const UserCardListPlaceholder = () => {
  const { theme } = useUnistyles();

  const renderUserCard = (_: null, index: number) => (
    <SkeletonPlaceholder.Item
      key={index}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingVertical={8}
    >
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={8}>
        <SkeletonPlaceholder.Item width={28} height={28} borderRadius={100} />
        <SkeletonPlaceholder.Item width={120} height={16} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={80} height={32} borderRadius={8} />
    </SkeletonPlaceholder.Item>
  );

  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={theme.colors.background.secondary}>
      <SkeletonPlaceholder.Item paddingHorizontal={16}>
        {new Array(ITEM_COUNT).fill(null).map(renderUserCard)}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default UserCardListPlaceholder;
