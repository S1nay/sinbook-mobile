import { Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import TurboImage from 'react-native-turbo-image';

import styles from './styles';
import { ImageCarouselProps } from './types';

type ImageType = 'local' | 'remote' | 'appended';

const ImageCarousel = (props: ImageCarouselProps) => {
  const {
    images = [],
    imageHeight,
    imageWidth,
    enablePagination = true,
    carouselStyle,
    appendItem,
    itemSpacing,
  } = props;

  const progress = useSharedValue<number>(0);

  const data = [...images, ...(appendItem ? ['appendedItem'] : [])];

  const getImageType = (uri: string): ImageType => {
    switch (true) {
      case uri.includes('file'): {
        return 'local';
      }
      case uri.includes('http') || uri.includes('https'): {
        return 'remote';
      }
      default: {
        return 'appended';
      }
    }
  };

  const renderImage = ({ item: uri, index }: CarouselRenderItemInfo<string>) => {
    const isLast = index === data.length - 1;
    const isAppended = getImageType(uri) === 'appended';
    const isLocal = getImageType(uri) === 'local';

    const ImageComponent = isLocal ? Image : TurboImage;

    const content = isAppended ? (
      appendItem
    ) : (
      <ImageComponent source={{ uri }} style={styles.image} resizeMode="cover" />
    );

    return <View style={!isLast && !!itemSpacing && { paddingRight: itemSpacing }}>{content}</View>;
  };

  return (
    <View>
      <Carousel
        loop={false}
        enabled={data.length > 1}
        width={imageWidth}
        height={imageHeight}
        data={data}
        onProgressChange={progress}
        renderItem={renderImage}
        style={[styles.carousel, carouselStyle]}
        containerStyle={styles.imageContainer}
      />

      {data.length > 1 && enablePagination && (
        <Pagination.Custom
          data={Array(data.length).fill(0)}
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
