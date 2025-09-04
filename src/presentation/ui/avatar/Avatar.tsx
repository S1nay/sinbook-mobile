import { memo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import TurboImage, { TurboImageProps } from 'react-native-turbo-image';

interface AvatarProps extends ViewStyle {
  uri: string;
  size?: number;
  imageProps?: Omit<TurboImageProps, 'style' | 'source'>;
}

const Avatar = (props: AvatarProps) => {
  const { uri, size = 28, imageProps, ...otherProps } = props;

  return (
    <Pressable {...otherProps}>
      <TurboImage {...imageProps} source={{ uri }} style={{ width: size, height: size }} />
    </Pressable>
  );
};

export default memo(Avatar);
