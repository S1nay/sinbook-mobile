/* eslint-disable react-native/no-inline-styles */
import { memo } from 'react';
import Animated from 'react-native-reanimated';

import styles from './styles';
import { LabelProps } from './types';

const Label = (props: LabelProps) => {
  const { label, isFocused, config, value, labelStyle } = props;

  return (
    <Animated.Text
      style={{
        transitionProperty: ['fontSize', 'color', 'transform'],
        transitionDuration: 200,
        fontSize: isFocused || value ? 12 : 14,
        transform: [
          { translateY: isFocused || value ? -42 : -12 },
          { translateX: isFocused || value ? -20 : 0 },
        ],
        ...styles.label,
        ...config.label,
        ...labelStyle,
      }}
    >
      {label}
    </Animated.Text>
  );
};

export default memo(Label);
