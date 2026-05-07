import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ colors, typography }) => ({
  container: {
    backgroundColor: colors.background.primary,
    boxShadow: [{ blurRadius: 5, offsetX: 0, offsetY: 0, color: colors.overlay.shadowSubtle }],
    flex: 1,
    gap: 12,
    paddingVertical: 16,
  },
  postAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  postActionText: {
    color: colors.foreground.muted,
    fontFamily: typography.family.regular,
    fontSize: typography.size.sm,
  },
  postActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    paddingHorizontal: 16,
  },
  postContent: {
    color: colors.foreground.primary,
    paddingHorizontal: 16,
  },
  postDateCreated: {
    color: colors.foreground.muted,
    fontFamily: typography.family.regular,
    fontSize: typography.size.xs,
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  postHeaderInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  postUserNickname: {
    fontFamily: typography.family.bold,
    fontSize: typography.size.sm,
    color: colors.foreground.primary,
  },
}));
