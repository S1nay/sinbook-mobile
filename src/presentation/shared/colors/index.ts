import { lightTheme } from '@shared/theme/light';

/**
 * @deprecated Migrate styles.ts files to StyleSheet.create((theme) => ({...})) from react-native-unistyles.
 * This shim re-exports the light theme values to keep existing styles compiling during migration.
 */
export const Colors = {
  black: lightTheme.colors.foreground.primary,
  shadowBlack: lightTheme.colors.overlay.shadow,
  orange: lightTheme.colors.accent.default,
  lightOrange: lightTheme.colors.accent.hover,
  secondaryLightOrange: lightTheme.colors.accent.subtle,
  gray: lightTheme.colors.foreground.secondary,
  secondaryGray: lightTheme.colors.foreground.muted,
  lightGray: lightTheme.colors.border.default,
  red: lightTheme.colors.danger.default,
  lightRed: lightTheme.colors.danger.subtle,
  white: lightTheme.colors.background.primary,
  secondaryWhite: lightTheme.colors.background.secondary,
  transparent: 'transparent',
  dot: lightTheme.colors.border.subtle,
  green: lightTheme.colors.success.default,
} as const;
