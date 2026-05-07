import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create(({ typography, components }) => ({
  trigger: {
    position: 'relative',
    justifyContent: 'center',
    zIndex: 2,
    padding: 4,
    variants: {
      orientation: {
        horizontal: {
          flex: 1,
        },
        vertical: {},
      },
      isDisabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  label: {
    textAlign: 'center',
    variants: {
      isActive: {
        true: {
          fontFamily: typography.family.bold,
          color: components.segmentedControl.label.active,
        },
        false: {
          fontFamily: typography.family.regular,
          color: components.segmentedControl.label.inactive,
        },
      },
    },
  },
}));
