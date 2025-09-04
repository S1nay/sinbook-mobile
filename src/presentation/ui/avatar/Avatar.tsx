import { memo } from 'react';
import { Pressable } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import { AvatarProps } from './types';

const Avatar = (props: AvatarProps) => {
  const { uri, size = 28, imageProps, ...otherProps } = props;

  return (
    <Pressable {...otherProps}>
      <TurboImage {...imageProps} source={{ uri }} style={{ width: size, height: size }} />
    </Pressable>
  );
};

export default memo(Avatar);
