import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  container: {
    gap: 20,
  },
  editIcon: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: '50%',
    bottom: 0,
    boxShadow: [{ offsetX: 0, offsetY: 0, blurRadius: 10, color: Colors.lightGray }],
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 32,
  },
});
