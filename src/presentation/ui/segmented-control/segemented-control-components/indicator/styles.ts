import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ radii, components }) => ({
  indicator: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: radii.pill,
    backgroundColor: components.segmentedControl.indicator,
  },
}));
