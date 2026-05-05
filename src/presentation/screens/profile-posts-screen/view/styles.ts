import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  container: {
    backgroundColor: colors.background.secondary,
  },
  listContainer: {
    gap: 24,
    paddingVertical: 24,
  },
}));
