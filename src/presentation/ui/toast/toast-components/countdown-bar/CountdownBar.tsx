import { useEffect } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Colors } from '@shared/colors';

import styles from './styles';

interface CountdownBarProps {
  duration: number;
  onComplete?: () => void;
  color?: string;
  backgroundColor?: string;
  height?: number;
  borderRadius?: number;
  autoStart?: boolean;
  style?: StyleProp<ViewStyle>;
  isStart: boolean;
}

const CountdownBar: React.FC<CountdownBarProps> = ({
  duration,
  color = Colors.white,
  height = 6,
  borderRadius = 3,
  backgroundColor = Colors.green,
  style,
  isStart,
}) => {
  const progress = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  useEffect(() => {
    progress.value = withTiming(0, { duration }, isFinished => {
      if (isFinished) {
        progress.value = 1;
      }
    });
  }, [isStart]);

  return (
    <View style={[styles.container, style, { height, borderRadius, backgroundColor }]}>
      <Animated.View
        style={[styles.fill, animatedStyle, { backgroundColor: color, borderRadius }]}
      />
    </View>
  );
};

export default CountdownBar;
