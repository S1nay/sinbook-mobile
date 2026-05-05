import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },

  removeButton: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 100,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 24,
  },
  removeIcon: {
    transform: [{ rotate: '45deg' }],
  },
});
