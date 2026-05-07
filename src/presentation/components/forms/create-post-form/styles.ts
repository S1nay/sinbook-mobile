import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, typography }) => ({
  carouselStyle: {
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'visible',
  },
  charCounter: {
    alignSelf: 'flex-end',
    color: colors.foreground.muted,
    fontSize: typography.size.sm,
    marginTop: 4,
  },
  imageStyle: {
    borderRadius: 8,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        color: colors.overlay.shadow,
      },
    ],
  },
  imagesError: {
    color: colors.danger.default,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        color: colors.overlay.shadow,
      },
    ],
    justifyContent: 'center',
  },
}));
