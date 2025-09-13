import { RefObject } from 'react';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { MaskedTextInputRef } from 'react-native-advanced-input-mask';

import { Colors } from '@shared/colors';
import { MaskVariants } from '@shared/utils/masks';
import { IconProps } from '@ui/icon/types';

export type InputVariants = 'line-transparent' | 'outlined-transparent' | 'borderless-filled';

export type InputState = 'default' | 'focused' | 'error' | 'disabled';

export type InputConfig = {
  [key in InputState]: {
    input: ViewStyle;
    startIcon: { color: ValuesOf<typeof Colors>; left?: number };
    endIcon: { color: ValuesOf<typeof Colors>; right?: number };
    label: Omit<ViewStyle, 'translateX'> & { translateX: number };
  };
} & {
  withStartIcon: {
    input: ViewStyle;
    label: Omit<ViewStyle, 'translateX'> & { translateX: number };
  };
  withEndIcon: {
    input: ViewStyle;
  };
};

export type GetInputConfigParams = {
  [key in Partial<Exclude<InputState, 'default'>>]: boolean;
} & { variant: InputVariants; startIcon: boolean; endIcon: boolean };

export type GetInputConfigReturnType = {
  input: ViewStyle;
  startIcon: { color: ValuesOf<typeof Colors>; left?: number };
  endIcon: { color: ValuesOf<typeof Colors>; left?: number };
  label: Omit<ViewStyle, 'translateX'> & { translateX: number };
};

export interface InputProps extends Omit<TextInputProps, 'mask' | 'onChangeText' | 'onChange'> {
  mask?: MaskVariants;
  format?: (value: string) => string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  ref?: RefObject<Pick<MaskedTextInputRef, 'blur' | 'focus'>>;
  name: string;
  variant?: InputVariants;
  label: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}
