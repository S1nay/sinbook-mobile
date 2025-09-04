import { TextStyle } from 'react-native';

import { GetInputConfigReturnType } from '@ui/input/types';

export interface LabelProps {
  label: string;
  labelStyle?: TextStyle;
  isFocused: boolean;
  config: GetInputConfigReturnType;
  value: string;
}
