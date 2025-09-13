import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    boxShadow: [
      {
        blurRadius: 6,
        offsetX: 0,
        offsetY: 4,
        color: '#F3F4F6',
      },
    ],
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  headerLeftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  title: {
    color: Colors.black,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});
