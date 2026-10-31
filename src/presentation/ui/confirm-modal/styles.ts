import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, typography }) => ({
  backdrop: {
    alignItems: 'center',
    backgroundColor: colors.overlay.scrim,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    gap: 12,
    padding: 24,
    width: '100%',
  },
  title: {
    color: colors.foreground.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.xl,
  },
  message: {
    color: colors.foreground.secondary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.md,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  action: {
    flex: 1,
  },
}));
