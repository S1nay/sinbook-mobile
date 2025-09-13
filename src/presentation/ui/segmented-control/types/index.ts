import { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface SegmentedControlProps extends ViewProps {
  options: Array<string>;
  selectedOption: string;
  onPressOption: (option: string) => void;
  optionStyle?: StyleProp<ViewStyle>;
}
