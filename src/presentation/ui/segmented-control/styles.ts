import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  activeItem: {
    backgroundColor: Colors.secondaryLightOrange,
    borderRadius: 12,
    height: 24,
    position: 'absolute',
  },
  activeText: {
    color: Colors.lightOrange,
    fontFamily: 'Inter-Bold',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingHorizontal: 21,
    paddingVertical: 1,
  },
  text: {
    color: Colors.gray,
    fontFamily: 'Inter-Regular',
  },
});
