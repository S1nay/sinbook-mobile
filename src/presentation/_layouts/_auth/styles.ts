import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, typography }) => ({
  container: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
  },
  inner: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    color: colors.foreground.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.xxl,
    textAlign: 'center',
  },
}));
