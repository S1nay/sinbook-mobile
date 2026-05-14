import { memo, PropsWithChildren } from 'react';
import { Image } from 'react-native';

import AppImage from '@ui/image';

import { AvatarProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const AVATAR_PLACEHOLDER = require('../../shared/images/avatar-placeholder.jpg');

const Avatar = (props: PropsWithChildren<AvatarProps>) => {
  const { uri, size = 28, imageProps, children } = props;

  return (
    <>
      {uri ? (
        <AppImage {...imageProps} source={{ uri }} rounded style={{ width: size, height: size }} />
      ) : (
        <Image
          source={AVATAR_PLACEHOLDER}
          style={{ width: size, height: size }}
          borderRadius={100}
        />
      )}

      {children}
    </>
  );
};

export default memo(Avatar);
