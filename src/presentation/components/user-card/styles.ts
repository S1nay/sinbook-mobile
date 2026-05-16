import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ typography, colors }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nickName: {
    fontFamily: typography.family.bold,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.lg,
    color: colors.foreground.primary,
  },
}));
