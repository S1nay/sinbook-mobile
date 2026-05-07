import { StyleProp, ViewStyle } from 'react-native';

export interface SegmentedControlIndicatorProps {
  style?: StyleProp<Omit<ViewStyle, 'zIndex' | 'position'>>;
}
