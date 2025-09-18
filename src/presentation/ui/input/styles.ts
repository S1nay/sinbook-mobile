import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  endIcon: {
    position: 'absolute',
    top: 28,
    zIndex: 2,
  },
  error: {
    color: Colors.red,
    fontSize: 14,
    paddingLeft: 8,
  },
  startIcon: {
    position: 'absolute',
    top: 28,
    zIndex: 2,
  },
});
