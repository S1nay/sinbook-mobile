import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  biography: {
    color: Colors.lightGray,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 26,
  },
  container: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 45,
  },
  detailsText: {
    color: Colors.black,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  name: {
    color: Colors.black,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
});
