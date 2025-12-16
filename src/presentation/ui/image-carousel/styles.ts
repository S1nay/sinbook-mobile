import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  activeDot: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    overflow: 'hidden',
  },
  carousel: {
    width: '100%',
  },
  dot: {
    backgroundColor: Colors.dot,
    borderRadius: 100,
  },
  dotContainer: {
    gap: 8,
    marginTop: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
