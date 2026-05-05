import { Image, ImageStyle, Pressable, StyleProp } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import TurboImage from 'react-native-turbo-image';
import { useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import Icon from '@ui/icon';

import { styles } from './styles';

type CarouselImageItemProps = {
  uri: string;
  index: number;
  isLocal: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  onRemoveImage?: (index: number) => void;
};

const REMOVE_ANIMATION_DURATION = 250;

const CarouselImageItem = ({
  uri,
  index,
  isLocal,
  imageStyle,
  onRemoveImage,
}: CarouselImageItemProps) => {
  const { theme } = useUnistyles();
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleRemove = () => {
    if (!onRemoveImage) return;
    translateY.value = withTiming(-80, { duration: REMOVE_ANIMATION_DURATION });
    const handleRemoveImage = () => onRemoveImage?.(index);
    opacity.value = withTiming(0, { duration: REMOVE_ANIMATION_DURATION }, finished => {
      if (finished) scheduleOnRN(handleRemoveImage);
    });
  };

  const ImageComponent = isLocal ? Image : TurboImage;

  return (
    <Animated.View style={animatedStyle}>
      <ImageComponent source={{ uri }} style={[styles.image, imageStyle]} resizeMode="cover" />
      {!!onRemoveImage && (
        <Pressable style={styles.removeButton} onPress={handleRemove}>
          <Icon
            name="add"
            size={14}
            stroke={theme.colors.foreground.inverse}
            style={styles.removeIcon}
          />
        </Pressable>
      )}
    </Animated.View>
  );
};

export default CarouselImageItem;
