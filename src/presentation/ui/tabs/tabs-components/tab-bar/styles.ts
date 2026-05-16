import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  indicator: {
    backgroundColor: colors.accent.default,
    height: 3,
  },
  indicatorContainer: {
    backgroundColor: colors.background.primary,
  },
  tabBar: {
    backgroundColor: colors.background.primary,
    height: 68,
    alignItems: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
}));
