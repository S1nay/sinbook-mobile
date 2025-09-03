import { PressableProps, TextStyle, ViewStyle } from 'react-native';

import { IconProps } from '@ui/icon';

import { Colors } from '../../../shared/colors';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'large' | 'small';
export type ButtonState = 'default' | 'pressed' | 'disabled';

export type ButtonConfig = {
  [key in ButtonState]: {
    container: ViewStyle;
    text: TextStyle;
    icon: { color: ValuesOf<typeof Colors> };
  };
};

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  value: string;
  icon?: IconProps;
}
