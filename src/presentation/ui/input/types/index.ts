import { RefObject } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { MaskedTextInputRef } from 'react-native-advanced-input-mask';

import { Colors } from '@shared/colors';
import { MaskVariants } from '@shared/utils/masks';
import { IconProps } from '@ui/icon/types';

export type InputVariants = 'line-transparent' | 'outlined-transparent' | 'borderless-filled';

export type InputState = 'default' | 'focused' | 'error' | 'disabled';

export type InputConfig = {
  [key in InputState]: {
    input: ViewStyle;
    startIcon: { color: ValuesOf<typeof Colors>; left?: number; top?: number };
    endIcon: { color: ValuesOf<typeof Colors>; right?: number; top?: number };
  };
} & {
  withStartIcon: {
    input: ViewStyle;
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
};

export interface InputProps extends Omit<TextInputProps, 'mask' | 'onChange'> {
  mask?: MaskVariants;
  format?: (value: string) => string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  ref?: RefObject<Pick<MaskedTextInputRef, 'blur' | 'focus'>>;
  variant?: InputVariants;
  label: string;
  containerStyle?: ViewStyle;
  error?: string;
}
