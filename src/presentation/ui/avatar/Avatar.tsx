import { memo, PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import { AvatarProps } from './types';

const Avatar = (props: PropsWithChildren<AvatarProps>) => {
  const { uri, size = 28, imageProps, children, ...otherProps } = props;

  return (
    <Pressable {...otherProps}>
      <TurboImage {...imageProps} source={{ uri }} style={{ width: size, height: size }} />

      {children}
    </Pressable>
  );
};

export default memo(Avatar);
