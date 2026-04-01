import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ImageCarouselProps {
  images?: string[];
  imageWidth: number;
  imageHeight: number;
  enablePagination?: boolean;
  carouselStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
  appendItem?: ReactNode;
  itemSpacing?: number;
}
