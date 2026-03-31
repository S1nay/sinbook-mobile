import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    boxShadow: [{ blurRadius: 5, offsetX: 0, offsetY: 0, color: Colors.secondaryWhite }],
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
    color: Colors.secondaryGray,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  postActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    paddingHorizontal: 16,
  },
  postContent: {
    paddingHorizontal: 16,
  },
  postDateCreated: {
    color: Colors.secondaryGray,
    fontFamily: 'Inter-Regular',
    fontSize: 11,
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
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
});
