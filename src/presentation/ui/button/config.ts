import { ViewStyle } from 'react-native';

import { ButtonConfig, ButtonSize, ButtonVariant } from './types';
import { Colors } from '../../shared/colors';

const PrimaryButtonConfig: ButtonConfig = {
  default: {
    container: { backgroundColor: Colors.black },
    text: { color: Colors.white },
    icon: { color: Colors.white },
  },
  pressed: {
    container: { backgroundColor: Colors.gray },
    text: { color: Colors.white },
    icon: { color: Colors.white },
  },
  disabled: {
    container: { backgroundColor: Colors.lightGray },
    text: { color: Colors.white },
    icon: { color: Colors.white },
  },
};

const SecondaryButtonConfig = {
  default: {
    container: {
      backgroundColor: Colors.transparent,
      borderWidth: 1,
      borderColor: Colors.lightOrange,
    },
    text: { color: Colors.lightOrange },
    icon: { color: Colors.lightOrange },
  },
  pressed: {
    container: { borderColor: Colors.orange },
    text: { color: Colors.orange },
    icon: { color: Colors.orange },
  },
  disabled: {
    container: { borderColor: Colors.lightGray },
    text: { color: Colors.lightGray },
    icon: { color: Colors.lightGray },
  },
};

export const getButtonConfig = (params: {
  variant: ButtonVariant;
  size: ButtonSize;
  pressed: boolean;
  disabled?: boolean | null;
}) => {
  const { variant, pressed, disabled, size } = params;

  const sizes: Record<ButtonSize, ViewStyle> = {
    large: { width: 343, paddingVertical: 11 },
    small: { width: 95, paddingVertical: 7 },
  };

  const variants = {
    primary: PrimaryButtonConfig,
    secondary: SecondaryButtonConfig,
  };

  const config = variants[variant];

  return {
    container: {
      ...config.default.container,
      ...sizes[size],
      ...(pressed ? config.pressed.container : {}),
      ...(disabled ? config.disabled.container : {}),
    },
    text: {
      ...config.default.text,
      ...(pressed ? config.pressed.text : {}),
      ...(disabled ? config.disabled.text : {}),
    },
    icon: {
      ...config.default.icon,
      ...(pressed ? config.pressed.icon : {}),
      ...(disabled ? config.disabled.icon : {}),
    },
  };
};
