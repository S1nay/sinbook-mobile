import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ colors }) => ({
  activeDot: {
    backgroundColor: colors.foreground.primary,
    borderRadius: 100,
    overflow: 'hidden',
  },
  carousel: {
    width: '100%',
  },
  dot: {
    backgroundColor: colors.border.subtle,
    borderRadius: 100,
  },
  dotContainer: {
    gap: 8,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
