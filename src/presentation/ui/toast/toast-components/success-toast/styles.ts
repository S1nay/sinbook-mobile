import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(({ components, typography }) => ({
  container: {
    backgroundColor: components.toast.successBg,
    borderRadius: 12,
    gap: 8,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 12,
    width: '95%',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  countdownBar: {
    bottom: 0,
    position: 'absolute',
    width: '110%',
  },
  success: {
    color: components.toast.fg,
    fontFamily: typography.family.regular,
    fontSize: typography.size.md,
  },
}));
