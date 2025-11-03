import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Colors } from '@shared/colors';

const ProfileInfoPlaceholder = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={Colors.secondaryWhite}>
      <SkeletonPlaceholder.Item alignItems="center" gap={12}>
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
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProfileInfoPlaceholder;
