import { PressableProps, TextStyle, ViewStyle } from 'react-native';

export interface CheckboxProps extends Omit<PressableProps, 'style'> {
  value: boolean;
  onCheck: PureFunction;
  label?: string;
  labelStyle?: TextStyle;
  style?: Omit<ViewStyle, 'backgroundColor' | 'borderColor' | 'borderWidth'>;
  containerStyle?: ViewStyle;
  iconSize?: number;
}
