import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(({ colors, typography, spacing }) => ({
  content: {
    flex: 1,
    padding: spacing(4),
    gap: spacing(6),
  },
  section: {
    gap: spacing(3),
  },
  sectionTitle: {
    color: colors.foreground.secondary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: colors.foreground.primary,
    fontFamily: typography.family.regular,
    fontSize: typography.size.md,
  },
  logoutButton: {
    marginTop: 'auto',
  },
}));

export default styles;
