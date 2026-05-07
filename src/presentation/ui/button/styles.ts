import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ components, typography }) => ({
  root: {
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    variants: {
      variant: {
        primary: {
          backgroundColor: components.button.primary.bg,
        },
        secondary: {
          backgroundColor: components.button.secondary.bg,
          borderWidth: 1,
          borderColor: components.button.secondary.border,
        },
      },
      size: {
        large: { width: '100%', paddingVertical: 11 },
        small: { width: 95, paddingVertical: 7 },
      },
      state: {
        default: {},
        pressed: {},
        disabled: {},
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        state: 'pressed',
        styles: { backgroundColor: components.button.primary.pressedBg },
      },
      {
        variant: 'primary',
        state: 'disabled',
        styles: { backgroundColor: components.button.primary.disabledBg },
      },
      {
        variant: 'secondary',
        state: 'pressed',
        styles: { borderColor: components.button.secondary.pressedBorder },
      },
      {
        variant: 'secondary',
        state: 'disabled',
        styles: { borderColor: components.button.secondary.disabledBorder },
      },
    ],
  },
  label: {
    fontFamily: typography.family.medium,
    fontSize: typography.size.md,
    variants: {
      variant: {
        primary: { color: components.button.primary.fg },
        secondary: { color: components.button.secondary.fg },
      },
      state: {
        default: {},
        pressed: {},
        disabled: {},
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        state: 'disabled',
        styles: { color: components.button.primary.disabledFg },
      },
      {
        variant: 'secondary',
        state: 'pressed',
        styles: { color: components.button.secondary.pressedFg },
      },
      {
        variant: 'secondary',
        state: 'disabled',
        styles: { color: components.button.secondary.disabledFg },
      },
    ],
  },
}));
