import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  bottomText: {
    textAlign: 'center',
    color: colors.foreground.primary,
  },
  errorContainer: { marginBottom: 12 },
  loginText: { color: colors.accent.default },
  submitButton: { marginTop: 50 },
}));
