import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ colors, typography }) => ({
  checkbox: {
    alignItems: 'center',
    borderRadius: 2,
    height: 16,
    justifyContent: 'center',
    width: 16,
    variants: {
      checked: {
        true: {
          backgroundColor: colors.accent.hover,
        },
        false: {
          borderColor: colors.foreground.secondary,
          borderWidth: 1,
        },
      },
    },
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  label: {
    color: colors.foreground.primary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.md,
  },
}));
