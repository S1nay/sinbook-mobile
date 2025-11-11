import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    boxShadow: [{ offsetX: 0, offsetY: -4, blurRadius: 9, color: Colors.secondaryWhite }],
    flexDirection: 'row',
    height: 70,
  },
  createPost: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: '100%',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  createPostText: {
    color: Colors.white,
    fontSize: 36,
    lineHeight: 40,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabBottomBorder: {
    backgroundColor: Colors.orange,
    bottom: -15,
    height: 2,
    position: 'absolute',
    width: 80,
  },
});
