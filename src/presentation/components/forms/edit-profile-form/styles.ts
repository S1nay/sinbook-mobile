import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors }) => ({
  avatar: {
    alignSelf: 'center',
  },
  container: {
    gap: 20,
  },
  editIcon: {
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: '50%' as unknown as number,
    bottom: 0,
    boxShadow: [{ offsetX: 0, offsetY: 0, blurRadius: 10, color: colors.border.default }],
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 32,
  },
}));
