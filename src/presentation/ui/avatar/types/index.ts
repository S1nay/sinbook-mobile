import { ViewStyle } from 'react-native';
import { TurboImageProps } from 'react-native-turbo-image';

export interface AvatarProps extends ViewStyle {
  uri: string;
  size?: number;
  imageProps?: Omit<TurboImageProps, 'style' | 'source'>;
}
