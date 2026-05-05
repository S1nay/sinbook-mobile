import { palette } from './palette';
import { gap, radii, spacing } from './spacing';
import type { AppTheme } from './types';
import { typography } from './typography';

export const darkTheme = {
  colors: {
    background: {
      primary: palette.darkBg,
      secondary: palette.darkBgSecondary,
      elevated: palette.darkBgSecondary,
      overlay: 'rgba(0,0,0,0.7)',
      inverse: palette.darkFgPrimary,
    },
    foreground: {
      primary: palette.darkFgPrimary,
      secondary: palette.darkFgSecondary,
      muted: palette.darkFgMuted,
      inverse: palette.darkBg,
      onAccent: palette.darkBg,
      onDanger: palette.white,
    },
    border: {
      default: palette.darkBorder,
      subtle: palette.darkBorderSubtle,
      strong: palette.darkFgSecondary,
      focus: palette.darkOrange,
    },
    accent: {
      default: palette.darkOrange,
      hover: palette.lightOrange,
      pressed: palette.darkOrangePressed,
      subtle: palette.darkOrangeSubtle,
      onAccent: palette.darkBg,
    },
    danger: {
      default: palette.darkRed,
      subtle: palette.darkRedSubtle,
      onDanger: palette.white,
    },
    success: {
      default: palette.darkGreen,
      subtle: '#1A3A10',
    },
    overlay: {
      scrim: 'rgba(0,0,0,0.7)',
      shadow: '#00000060',
    },
  },
  components: {
    button: {
      primary: {
        bg: palette.darkFgPrimary,
        fg: palette.darkBg,
        pressedBg: palette.darkFgSecondary,
        disabledBg: palette.darkBorder,
        disabledFg: palette.darkFgMuted,
        border: palette.transparent,
      },
      secondary: {
        bg: palette.transparent,
        fg: palette.darkOrange,
        pressedFg: palette.darkOrangePressed,
        disabledFg: palette.darkBorder,
        border: palette.darkOrange,
        pressedBorder: palette.darkOrangePressed,
        disabledBorder: palette.darkBorder,
      },
    },
    input: {
      lineTransparent: {
        border: palette.darkFgSecondary,
        focusBorder: palette.darkOrange,
        errorBorder: palette.darkRed,
        disabledBorder: palette.darkBorder,
      },
      outlinedTransparent: {
        border: palette.darkFgSecondary,
        focusBorder: palette.darkOrange,
        errorBorder: palette.darkRed,
        disabledBorder: palette.darkBorder,
      },
      borderlessFilled: {
        bg: palette.darkBgSecondary,
        errorBg: palette.darkRedSubtle,
        focusBorder: palette.darkFgSecondary,
        errorBorder: palette.darkRed,
        disabledBorder: palette.darkBorder,
      },
      icon: {
        default: palette.darkFgMuted,
        focused: palette.darkFgSecondary,
        error: palette.darkRed,
        disabled: palette.darkBorder,
      },
      label: {
        default: palette.darkFgMuted,
        error: palette.darkRed,
      },
    },
    statusBar: {
      barStyle: 'light-content' as const,
    },
    toast: {
      successBg: palette.darkGreen,
      errorBg: palette.darkRed,
      fg: palette.darkBg,
    },
  },
  typography,
  spacing,
  radii,
  gap,
} satisfies AppTheme;

export type DarkTheme = typeof darkTheme;
