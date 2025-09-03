import { Colors } from '@shared/colors';

import { GetInputConfigParams, InputConfig, InputVariants } from './types';

const LineTransparentInputConfig: InputConfig = {
  default: {
    input: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
      paddingHorizontal: 0,
    },
    startIcon: { color: Colors.gray, left: 0 },
    endIcon: { color: Colors.gray, right: 0 },
  },
  focused: {
    input: { borderBottomColor: Colors.lightOrange },
    startIcon: { color: Colors.gray, left: 0 },
    endIcon: { color: Colors.gray, right: 0 },
  },
  error: {
    input: { borderBottomColor: Colors.red },
    startIcon: { color: Colors.red, left: 0 },
    endIcon: { color: Colors.red, right: 0 },
  },
  disabled: {
    input: { borderBottomColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray, left: 0 },
    endIcon: { color: Colors.lightGray, right: 0 },
  },
  withStartIcon: { paddingLeft: 22 },
  withEndIcon: { paddingRight: 22 },
};

const OutlinedTransparentInputConfig: InputConfig = {
  default: {
    input: {
      borderWidth: 1,
      borderRadius: 4,
      borderBottomColor: Colors.gray,
      paddingHorizontal: 8,
    },
    startIcon: { color: Colors.gray, left: 12 },
    endIcon: { color: Colors.gray, right: 12 },
  },
  focused: {
    input: { borderBottomColor: Colors.lightOrange },
    startIcon: { color: Colors.gray, left: 12 },
    endIcon: { color: Colors.gray, right: 12 },
  },
  error: {
    input: { borderBottomColor: Colors.red },
    startIcon: { color: Colors.red, left: 12 },
    endIcon: { color: Colors.red, right: 12 },
  },
  disabled: {
    input: { borderBottomColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray, left: 12 },
    endIcon: { color: Colors.lightGray, right: 12 },
  },
  withStartIcon: { paddingLeft: 34 },
  withEndIcon: { paddingRight: 34 },
};

const BorderlessFilledInputConfig: InputConfig = {
  default: {
    input: {
      backgroundColor: Colors.secondaryWhite,
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    startIcon: { color: Colors.gray, left: 12 },
    endIcon: { color: Colors.gray, right: 12 },
  },
  focused: {
    input: { borderBottomColor: Colors.lightOrange },
    startIcon: { color: Colors.gray, left: 12 },
    endIcon: { color: Colors.gray, right: 12 },
  },
  error: {
    input: { borderBottomColor: Colors.red },
    startIcon: { color: Colors.red, left: 12 },
    endIcon: { color: Colors.red, right: 12 },
  },
  disabled: {
    input: { borderBottomColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray, left: 12 },
    endIcon: { color: Colors.lightGray, right: 12 },
  },
  withStartIcon: { paddingLeft: 34 },
  withEndIcon: { paddingRight: 34 },
};

export const getInputConfig = (params: GetInputConfigParams) => {
  const { variant, disabled, error, focused, startIcon, endIcon } = params;

  const variants: Record<InputVariants, InputConfig> = {
    'line-transparent': LineTransparentInputConfig,
    'borderless-filled': BorderlessFilledInputConfig,
    'outlined-transparent': OutlinedTransparentInputConfig,
  };

  const config = variants[variant];

  return {
    input: {
      ...config.default.input,
      ...(startIcon ? config.withStartIcon : {}),
      ...(endIcon ? config.withEndIcon : {}),
      ...(focused ? config.focused.input : {}),
      ...(error ? config.error.input : {}),
      ...(disabled ? config.disabled.input : {}),
    },
    startIcon: {
      ...config.default.startIcon,
      ...(focused ? config.focused.startIcon : {}),
      ...(error ? config.error.startIcon : {}),
      ...(disabled ? config.disabled.startIcon : {}),
    },
    endIcon: {
      ...config.default.endIcon,
      ...(focused ? config.focused.endIcon : {}),
      ...(error ? config.error.endIcon : {}),
      ...(disabled ? config.disabled.endIcon : {}),
    },
  };
};
