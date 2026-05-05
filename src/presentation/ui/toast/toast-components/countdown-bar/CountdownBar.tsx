import { useEffect } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import { styles } from './styles';

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
  color,
  height = 6,
  borderRadius = 3,
  backgroundColor,
  style,
  isStart,
}) => {
  const { theme } = useUnistyles();
  const barColor = color ?? theme.components.toast.fg;
  const barBg = backgroundColor ?? theme.components.toast.successBg;
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
    <View style={[styles.container, style, { height, borderRadius, backgroundColor: barBg }]}>
      <Animated.View
        style={[styles.fill, animatedStyle, { backgroundColor: barColor, borderRadius }]}
      />
    </View>
  );
};

export default CountdownBar;
