import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Asset } from 'react-native-image-picker';

export interface MediaPickerProps {
  onPick: (assets: Asset[]) => void;
  selectionLimit?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}
