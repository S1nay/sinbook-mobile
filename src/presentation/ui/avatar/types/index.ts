import { PressableProps } from 'react-native';
import { TurboImageProps } from 'react-native-turbo-image';

export interface AvatarProps extends PressableProps {
  uri?: string | null;
  size?: number;
  imageProps?: Omit<TurboImageProps, 'style' | 'source'>;
}
