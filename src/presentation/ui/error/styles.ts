import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ colors, radii, spacing, typography }) => ({
  container: {
    backgroundColor: colors.danger.subtle,
    borderRadius: radii.md,
    padding: spacing(2),
    width: '100%',
  },
  text: {
    color: colors.danger.default,
    fontFamily: typography.family.medium,
    fontSize: typography.size.md,
  },
}));
