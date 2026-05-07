import { StyleSheet } from 'react-native-unistyles';

export default StyleSheet.create({
  content: {
    overflow: 'visible',
    position: 'relative',
    variants: {
      orientation: {
        horizontal: {
          flexDirection: 'row',
        },
        vertical: {
          flexDirection: 'column',
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  wrapper: {
    overflow: 'visible',
  },
});
