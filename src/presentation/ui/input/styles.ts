import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ components, typography }) => ({
  wrapper: {
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  inputField: {
    color: components.input.text,
    variants: {
      variant: {
        'line-transparent': {
          borderBottomWidth: 1,
          borderBottomColor: components.input.lineTransparent.border,
          paddingHorizontal: 0,
        },
        'outlined-transparent': {
          borderRadius: 6,
          borderWidth: 1,
          borderColor: components.input.outlinedTransparent.border,
          paddingHorizontal: 8,
        },
        'borderless-filled': {
          backgroundColor: components.input.borderlessFilled.bg,
          borderRadius: 6,
          paddingHorizontal: 8,
        },
      },
      state: {
        default: {},
        focused: {},
        error: {},
        disabled: {},
      },
      withStartIcon: {
        true: {},
        false: {},
      },
      withEndIcon: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // line-transparent states
      {
        variant: 'line-transparent',
        state: 'focused',
        styles: { borderBottomColor: components.input.lineTransparent.focusBorder },
      },
      {
        variant: 'line-transparent',
        state: 'error',
        styles: { borderBottomColor: components.input.lineTransparent.errorBorder },
      },
      {
        variant: 'line-transparent',
        state: 'disabled',
        styles: { borderBottomColor: components.input.lineTransparent.disabledBorder },
      },
      // outlined-transparent states
      {
        variant: 'outlined-transparent',
        state: 'focused',
        styles: { borderColor: components.input.outlinedTransparent.focusBorder },
      },
      {
        variant: 'outlined-transparent',
        state: 'error',
        styles: { borderColor: components.input.outlinedTransparent.errorBorder },
      },
      {
        variant: 'outlined-transparent',
        state: 'disabled',
        styles: { borderColor: components.input.outlinedTransparent.disabledBorder },
      },
      // borderless-filled states
      {
        variant: 'borderless-filled',
        state: 'focused',
        styles: {
          borderColor: components.input.borderlessFilled.focusBorder,
        },
      },
      {
        variant: 'borderless-filled',
        state: 'error',
        styles: {
          borderColor: components.input.borderlessFilled.errorBorder,
          backgroundColor: components.input.borderlessFilled.errorBg,
        },
      },
      // withStartIcon padding
      {
        variant: 'line-transparent',
        withStartIcon: true,
        styles: { paddingLeft: 22 },
      },
      {
        variant: 'outlined-transparent',
        withStartIcon: true,
        styles: { paddingLeft: 34 },
      },
      {
        variant: 'borderless-filled',
        withStartIcon: true,
        styles: { paddingLeft: 34 },
      },
      // withEndIcon padding
      {
        variant: 'line-transparent',
        withEndIcon: true,
        styles: { paddingRight: 22 },
      },
      {
        variant: 'outlined-transparent',
        withEndIcon: true,
        styles: { paddingRight: 34 },
      },
      {
        variant: 'borderless-filled',
        withEndIcon: true,
        styles: { paddingRight: 34 },
      },
    ],
  },
  startIcon: {
    position: 'absolute',
    zIndex: 2,
    variants: {
      variant: {
        'line-transparent': { left: 0, top: 28 },
        'outlined-transparent': { left: 12, top: 12 },
        'borderless-filled': { left: 12, top: 12 },
      },
    },
  },
  endIcon: {
    position: 'absolute',
    zIndex: 2,
    variants: {
      variant: {
        'line-transparent': { right: 0, top: 28 },
        'outlined-transparent': { right: 12, top: 12 },
        'borderless-filled': { right: 12, top: 12 },
      },
    },
  },
  error: {
    color: components.input.lineTransparent.errorBorder,
    fontSize: typography.size.sm,
    paddingLeft: 8,
  },
}));
