import { TurboImageProps } from 'react-native-turbo-image';

export interface AvatarProps {
  uri?: string | null;
  size?: number;
  imageProps?: Omit<TurboImageProps, 'style' | 'source'>;
}
