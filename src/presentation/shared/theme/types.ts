import { breakpoints } from './breakpoints';
import type { DarkTheme } from './dark';
import type { LightTheme } from './light';
import { gap, radii } from './spacing';
import { typography } from './typography';

export type AppTheme = {
  colors: {
    background: {
      primary: string;
      secondary: string;
      elevated: string;
      overlay: string;
      inverse: string;
    };
    foreground: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
      onAccent: string;
      onDanger: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
      focus: string;
      separator: string;
    };
    accent: {
      default: string;
      hover: string;
      pressed: string;
      subtle: string;
      onAccent: string;
    };
    danger: {
      default: string;
      subtle: string;
      onDanger: string;
    };
    success: {
      default: string;
      subtle: string;
    };
    overlay: {
      scrim: string;
      shadow: string;
      shadowSubtle: string;
    };
  };
  components: {
    button: {
      primary: {
        bg: string;
        fg: string;
        pressedBg: string;
        disabledBg: string;
        disabledFg: string;
        border: string;
      };
      secondary: {
        bg: string;
        fg: string;
        pressedFg: string;
        disabledFg: string;
        border: string;
        pressedBorder: string;
        disabledBorder: string;
      };
    };
    input: {
      text: string;
      placeholder: string;
      lineTransparent: {
        border: string;
        focusBorder: string;
        errorBorder: string;
        disabledBorder: string;
      };
      outlinedTransparent: {
        border: string;
        focusBorder: string;
        errorBorder: string;
        disabledBorder: string;
      };
      borderlessFilled: {
        bg: string;
        errorBg: string;
        focusBorder: string;
        errorBorder: string;
        disabledBorder: string;
      };
      icon: {
        default: string;
        focused: string;
        error: string;
        disabled: string;
      };
      label: {
        default: string;
        error: string;
      };
    };
    segmentedControl: {
      indicator: string;
      label: {
        active: string;
        inactive: string;
      };
    };
    statusBar: {
      barStyle: 'light-content' | 'dark-content';
    };
    toast: {
      successBg: string;
      errorBg: string;
      fg: string;
    };
  };
  typography: typeof typography;
  spacing: (n: number) => number;
  radii: typeof radii;
  gap: typeof gap;
};

export type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: LightTheme;
    dark: DarkTheme;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
