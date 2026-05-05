import { RefObject } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { MaskedTextInputRef } from 'react-native-advanced-input-mask';

import { MaskVariants } from '@shared/utils/masks';
import { IconProps } from '@ui/icon/types';

export type InputVariants = 'line-transparent' | 'outlined-transparent' | 'borderless-filled';

export type InputState = 'default' | 'focused' | 'error' | 'disabled';

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
