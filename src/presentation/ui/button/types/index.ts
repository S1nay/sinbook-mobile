import { PressableProps, TextStyle } from 'react-native';

import { IconProps } from '@ui/icon';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'large' | 'small';
export type ButtonState = 'default' | 'pressed' | 'disabled';

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  value: string;
  icon?: IconProps;
  textStyle?: TextStyle;
  isLoading?: boolean;
}
