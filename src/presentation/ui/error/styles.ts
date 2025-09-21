import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.lightRed,
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  text: {
    color: Colors.red,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});
