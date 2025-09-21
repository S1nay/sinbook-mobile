import { StyleSheet } from 'react-native';

import { Colors } from '@shared/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
  },
  inner: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    textAlign: 'center',
  },
});
