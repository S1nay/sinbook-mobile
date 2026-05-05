import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ colors, typography }) => ({
  activeItem: {
    backgroundColor: colors.accent.subtle,
    borderRadius: 12,
    height: 24,
    position: 'absolute',
  },
  activeText: {
    color: colors.accent.hover,
    fontFamily: typography.family.bold,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingHorizontal: 21,
    paddingVertical: 1,
  },
  text: {
    color: colors.foreground.secondary,
    fontFamily: typography.family.regular,
  },
}));
