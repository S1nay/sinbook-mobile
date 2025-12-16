import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import TurboImage from 'react-native-turbo-image';

import { getConnectUrl } from '@core/helpers';

import styles from './styles';
import { ImageCarouselProps } from './types';

const ImageCarousel = (props: ImageCarouselProps) => {
  const { images, imageHeight, imageWidth, enablePagination = true } = props;

  const progress = useSharedValue<number>(0);

  const renderImage = ({ item }: CarouselRenderItemInfo<string>) => {
    return (
      <TurboImage
        source={{ uri: getConnectUrl(item) || '' }}
        style={styles.image}
        resizeMode="cover"
      />
    );
  };

  return (
    <View>
      <Carousel
        loop={false}
        enabled={images.length > 1}
        width={imageWidth}
        height={imageHeight}
        data={images}
        onProgressChange={progress}
        renderItem={renderImage}
        style={styles.carousel}
        containerStyle={styles.imageContainer}
      />

      {images.length > 1 && enablePagination && (
        <Pagination.Custom
          data={images}
          dotStyle={styles.dot}
          size={5}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.dotContainer}
          progress={progress}
        />
      )}
    </View>
  );
};

export default ImageCarousel;
