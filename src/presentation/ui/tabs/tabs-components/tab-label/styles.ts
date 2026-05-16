import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ typography, colors }) => ({
  labelWrapper: {
    alignItems: 'center',
  },
  label: {
    fontSize: typography.size.md,
    variants: {
      focused: {
        true: {
          color: colors.accent.default,
          fontFamily: typography.family.bold,
        },
        false: {
          color: colors.foreground.muted,
          fontFamily: typography.family.regular,
        },
      },
    },
  },
}));
