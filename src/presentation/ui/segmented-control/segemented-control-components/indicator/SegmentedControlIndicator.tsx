import { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

import styles from './styles';
import { SegmentedControlIndicatorProps } from './types';
import { useSegmentedControl } from '../../context';

const SPRING_CONFIG: WithSpringConfig = {
  damping: 12,
  stiffness: 120,
  mass: 0.8,
};

const SegmentedControlIndicator = (props: SegmentedControlIndicatorProps) => {
  const { style } = props;

  const { value, layouts } = useSegmentedControl();

  const activeLayout = useDerivedValue(() => {
    return layouts.value[value] ?? null;
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    const itemLayout = activeLayout.value;

    if (!itemLayout) {
      return { opacity: 0 };
    }

    return {
      opacity: 1,
      transform: [
        { translateX: withSpring(itemLayout.x, SPRING_CONFIG) },
        { translateY: withSpring(itemLayout.y, SPRING_CONFIG) },
      ],
      width: withSpring(itemLayout.width, SPRING_CONFIG),
      height: withSpring(itemLayout.height, SPRING_CONFIG),
    };
  }, [value]);

  return <Animated.View style={[styles.indicator, animatedStyle, style]} />;
};

export default memo(SegmentedControlIndicator);
