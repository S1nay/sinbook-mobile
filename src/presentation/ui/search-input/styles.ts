import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  container: {
    padding: 24,
    backgroundColor: colors.background.secondary,
    boxShadow: [
      {
        blurRadius: 10,
        offsetX: 0,
        offsetY: 2,
        color: colors.overlay.shadow,
      },
    ],
  },
}));
