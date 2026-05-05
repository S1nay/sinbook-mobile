import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useUnistyles } from 'react-native-unistyles';

const ProfileInfoPlaceholder = () => {
  const { theme } = useUnistyles();

  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={theme.colors.background.secondary}>
      <SkeletonPlaceholder.Item alignItems="center" gap={12} marginBottom={12} marginTop={24}>
        <SkeletonPlaceholder.Item width={160} height={160} borderRadius={150} />

        <SkeletonPlaceholder.Item gap={4} alignItems="center">
          <SkeletonPlaceholder.Item width={50} height={30} />
          <SkeletonPlaceholder.Item width={150} height={30} />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item gap={36} flexDirection="row">
          <SkeletonPlaceholder.Item width={75} height={30} />
          <SkeletonPlaceholder.Item width={75} height={30} />
          <SkeletonPlaceholder.Item width={75} height={30} />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item width={Dimensions.get('window').width - 32} height={40} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProfileInfoPlaceholder;
