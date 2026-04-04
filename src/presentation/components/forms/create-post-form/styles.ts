import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  carouselStyle: {
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'visible',
  },
  charCounter: {
    alignSelf: 'flex-end',
    color: Colors.secondaryGray,
    fontSize: 12,
    marginTop: 4,
  },
  imageStyle: {
    borderRadius: 8,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        color: Colors.shadowBlack,
      },
    ],
  },
  imagesError: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: Colors.secondaryWhite,
    borderRadius: 8,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        color: Colors.shadowBlack,
      },
    ],
    justifyContent: 'center',
  },
});
