import { palette } from './palette';
import { gap, radii, spacing } from './spacing';
import type { AppTheme } from './types';
import { typography } from './typography';

export const lightTheme = {
  colors: {
    background: {
      primary: palette.white,
      secondary: palette.secondaryWhite,
      elevated: palette.white,
      overlay: palette.scrimLight,
      inverse: palette.black,
    },
    foreground: {
      primary: palette.black,
      secondary: palette.gray,
      muted: palette.secondaryGray,
      inverse: palette.white,
      onAccent: palette.white,
      onDanger: palette.white,
    },
    border: {
      default: palette.lightGray,
      subtle: palette.dot,
      strong: palette.gray,
      focus: palette.lightOrange,
      separator: palette.transparent,
    },
    accent: {
      default: palette.orange,
      hover: palette.lightOrange,
      pressed: palette.gray,
      subtle: palette.secondaryLightOrange,
      onAccent: palette.white,
    },
    danger: {
      default: palette.red,
      subtle: palette.lightRed,
      onDanger: palette.white,
    },
    success: {
      default: palette.green,
      subtle: palette.greenSubtle,
    },
    overlay: {
      scrim: palette.scrimLight,
      shadow: palette.shadowBlack,
      shadowSubtle: palette.shadowBlackSubtle,
    },
  },
  components: {
    button: {
      primary: {
        bg: palette.black,
        fg: palette.white,
        pressedBg: palette.gray,
        disabledBg: palette.lightGray,
        disabledFg: palette.white,
        border: palette.transparent,
      },
      secondary: {
        bg: palette.transparent,
        fg: palette.lightOrange,
        pressedFg: palette.orange,
        disabledFg: palette.lightGray,
        border: palette.lightOrange,
        pressedBorder: palette.orange,
        disabledBorder: palette.lightGray,
      },
    },
    input: {
      text: palette.black,
      placeholder: palette.lightGray,
      lineTransparent: {
        border: palette.gray,
        focusBorder: palette.lightOrange,
        errorBorder: palette.red,
        disabledBorder: palette.lightGray,
      },
      outlinedTransparent: {
        border: palette.gray,
        focusBorder: palette.lightOrange,
        errorBorder: palette.red,
        disabledBorder: palette.lightGray,
      },
      borderlessFilled: {
        bg: palette.secondaryWhite,
        errorBg: palette.lightRed,
        focusBorder: palette.gray,
        errorBorder: palette.red,
        disabledBorder: palette.lightGray,
      },
      icon: {
        default: palette.lightGray,
        focused: palette.gray,
        error: palette.red,
        disabled: palette.lightGray,
      },
      label: {
        default: palette.secondaryGray,
        error: palette.red,
      },
    },
    segmentedControl: {
      indicator: palette.secondaryLightOrange,
      label: {
        active: palette.orange,
        inactive: palette.secondaryGray,
      },
    },
    statusBar: {
      barStyle: 'dark-content' as const,
    },
    toast: {
      successBg: palette.green,
      errorBg: palette.red,
      fg: palette.white,
    },
  },
  typography,
  spacing,
  radii,
  gap,
} satisfies AppTheme;

export type LightTheme = typeof lightTheme;
