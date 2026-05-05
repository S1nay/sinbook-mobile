import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ colors }) => ({
  image: {
    height: '100%',
    width: '100%',
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: colors.foreground.primary,
    borderRadius: 100,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 24,
  },
  removeIcon: {
    transform: [{ rotate: '45deg' }],
  },
}));
