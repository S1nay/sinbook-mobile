import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';

import CarouselImageItem from './image-carousel-components';
import styles from './styles';
import { ImageCarouselProps, ImageType } from './types';

const getImageType = (uri: string): ImageType => {
  switch (true) {
    case uri.includes('file'):
      return 'local';
    case uri.includes('http') || uri.includes('https'):
      return 'remote';
    default:
      return 'appended';
  }
};

const ImageCarousel = (props: ImageCarouselProps) => {
  const {
    images = [],
    imageHeight,
    imageWidth,
    enablePagination = true,
    carouselStyle,
    imageStyle,
    appendItem,
    itemSpacing,
    onRemoveImage,
  } = props;

  const progress = useSharedValue<number>(0);

  const data = [...images, ...(appendItem ? ['appendedItem'] : [])];

  const renderImage = ({ item: uri, index }: CarouselRenderItemInfo<string>) => {
    const isLast = index === data.length - 1;
    const isAppended = getImageType(uri) === 'appended';
    const isLocal = getImageType(uri) === 'local';

    const content = isAppended ? (
      appendItem
    ) : (
      <CarouselImageItem
        uri={uri}
        index={index}
        isLocal={isLocal}
        imageStyle={imageStyle}
        onRemoveImage={onRemoveImage}
      />
    );

    return <View style={!isLast && !!itemSpacing && { paddingRight: itemSpacing }}>{content}</View>;
  };

  return (
    <View>
      <Carousel
        key={data.length}
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
