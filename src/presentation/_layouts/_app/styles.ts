import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  container: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  global: {
    flex: 1,
  },
}));
