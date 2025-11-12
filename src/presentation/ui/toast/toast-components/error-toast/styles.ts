import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
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
  error: {
    color: Colors.white,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
