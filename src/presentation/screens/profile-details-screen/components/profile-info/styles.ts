import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ typography, colors }) => ({
  biography: {
    color: colors.border.default,
    fontFamily: typography.family.regular,
    fontSize: typography.size.lg,
    lineHeight: 26,
  },
  container: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    padding: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 45,
    marginBottom: 8,
  },
  detailsText: {
    color: colors.foreground.primary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.lg,
  },
  name: {
    color: colors.foreground.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.xl,
  },
}));
