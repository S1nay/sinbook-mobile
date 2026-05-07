import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.separator,
    boxShadow: [{ offsetX: 0, offsetY: -4, blurRadius: 9, color: colors.overlay.shadowSubtle }],
    flexDirection: 'row',
    height: 70,
  },
  createPost: {
    alignItems: 'center',
    backgroundColor: colors.foreground.primary,
    borderRadius: '100%' as unknown as number,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  createPostText: {
    color: colors.foreground.inverse,
    fontSize: 36,
    lineHeight: 40,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabBottomBorder: {
    backgroundColor: colors.accent.default,
    bottom: -15,
    height: 2,
    position: 'absolute',
    width: 80,
  },
}));
