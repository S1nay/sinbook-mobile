import { Colors } from '@shared/colors';

import {
  GetInputConfigParams,
  GetInputConfigReturnType,
  InputConfig,
  InputVariants,
} from './types';

const LineTransparentInputConfig: InputConfig = {
  default: {
    input: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
      paddingHorizontal: 0,
    },
    startIcon: { color: Colors.lightGray, left: 0, top: 28 },
    endIcon: { color: Colors.lightGray, right: 0, top: 28 },
  },
  focused: {
    input: { borderBottomColor: Colors.lightOrange },
    startIcon: { color: Colors.gray },
    endIcon: { color: Colors.gray },
  },
  error: {
    input: { borderBottomColor: Colors.red },
    startIcon: { color: Colors.red },
    endIcon: { color: Colors.red },
  },
  disabled: {
    input: { borderBottomColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray },
    endIcon: { color: Colors.lightGray },
  },
  withStartIcon: {
    input: { paddingLeft: 22 },
  },
  withEndIcon: {
    input: { paddingRight: 22 },
  },
};

const OutlinedTransparentInputConfig: InputConfig = {
  default: {
    input: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: Colors.gray,
      paddingHorizontal: 8,
    },
    startIcon: { color: Colors.lightGray, left: 12, top: 12 },
    endIcon: { color: Colors.lightGray, right: 12, top: 12 },
  },
  focused: {
    input: { borderColor: Colors.lightOrange },
    startIcon: { color: Colors.gray },
    endIcon: { color: Colors.gray },
  },
  error: {
    input: { borderColor: Colors.red },
    startIcon: { color: Colors.red },
    endIcon: { color: Colors.red },
  },
  disabled: {
    input: { borderColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray },
    endIcon: { color: Colors.lightGray },
  },
  withStartIcon: {
    input: { paddingLeft: 34 },
  },
  withEndIcon: {
    input: { paddingRight: 34 },
  },
};

const BorderlessFilledInputConfig: InputConfig = {
  default: {
    input: {
      backgroundColor: Colors.secondaryWhite,
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    startIcon: { color: Colors.lightGray, left: 12, top: 12 },
    endIcon: { color: Colors.lightGray, right: 12, top: 12 },
  },
  focused: {
    input: {
      borderWidth: 1,
      borderColor: Colors.gray,
    },
    startIcon: { color: Colors.gray },
    endIcon: { color: Colors.gray },
  },
  error: {
    input: {
      borderWidth: 1,
      borderColor: Colors.red,
      backgroundColor: Colors.lightRed,
    },
    startIcon: { color: Colors.red },
    endIcon: { color: Colors.red },
  },
  disabled: {
    input: { borderBottomColor: Colors.lightGray },
    startIcon: { color: Colors.lightGray },
    endIcon: { color: Colors.lightGray },
  },
  withStartIcon: {
    input: { paddingLeft: 34 },
  },
  withEndIcon: {
    input: { paddingRight: 34 },
  },
};

export const getInputConfig = (params: GetInputConfigParams): GetInputConfigReturnType => {
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
      ...(startIcon ? config.withStartIcon.input : {}),
      ...(endIcon ? config.withEndIcon.input : {}),
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
