import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, typography }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.separator,
    boxShadow: [
      {
        blurRadius: 6,
        offsetX: 0,
        offsetY: 4,
        color: colors.overlay.shadow,
      },
    ],
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  headerLeftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  headerRightIcon: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  title: {
    color: colors.foreground.primary,
    fontFamily: typography.family.bold,
    fontSize: typography.size.lg,
  },
}));
