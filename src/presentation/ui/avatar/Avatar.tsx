import { memo, PropsWithChildren } from 'react';
import { Image, Pressable } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import { AvatarProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const AVATAR_PLACEHOLDER = require('../../shared/images/avatar-placeholder.jpg');

const Avatar = (props: PropsWithChildren<AvatarProps>) => {
  const { uri, size = 28, imageProps, children, ...otherProps } = props;

  return (
    <Pressable {...otherProps}>
      {uri ? (
        <TurboImage
          {...imageProps}
          source={{ uri }}
          rounded
          style={{ width: size, height: size }}
        />
      ) : (
        <Image
          source={AVATAR_PLACEHOLDER}
          style={{ width: size, height: size }}
          borderRadius={100}
        />
      )}

      {children}
    </Pressable>
  );
};

export default memo(Avatar);
