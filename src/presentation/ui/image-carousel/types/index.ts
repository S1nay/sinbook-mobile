import { ReactElement } from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

export interface ImageCarouselProps {
  images?: string[];
  imageWidth: number;
  imageHeight: number;
  enablePagination?: boolean;
  carouselStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  appendItem?: ReactElement | null;
  itemSpacing?: number;
  onRemoveImage?: (index: number) => void;
}

export type ImageType = 'local' | 'remote' | 'appended';
