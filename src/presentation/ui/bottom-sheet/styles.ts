import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, radii }) => ({
  handle: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
  },
  handleIndicator: {
    backgroundColor: colors.background.inverse,
  },
}));
