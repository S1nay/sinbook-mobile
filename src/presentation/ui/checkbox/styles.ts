import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: 2,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  label: {
    color: Colors.black,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
