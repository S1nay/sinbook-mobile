import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    height: 40,
    justifyContent: 'center',
    width: '95%',
  },
  error: {
    color: Colors.white,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
