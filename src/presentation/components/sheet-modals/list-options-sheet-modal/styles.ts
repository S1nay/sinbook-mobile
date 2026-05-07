import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ typography, colors }) => ({
  container: {
    backgroundColor: colors.background.secondary,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  text: {
    fontFamily: typography.family.regular,
    fontSize: typography.size.lg,
    color: colors.foreground.primary,
  },
}));
