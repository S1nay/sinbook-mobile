import { TurboImageProps } from 'react-native-turbo-image';

export interface ImageProps extends Omit<TurboImageProps, 'source'> {
  source: { uri: string };
}
