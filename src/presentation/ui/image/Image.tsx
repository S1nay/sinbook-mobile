import { memo } from 'react';
import TurboImage from 'react-native-turbo-image';

import { getConnectUrl } from '@core/helpers';

import { ImageProps } from './types';

const Image = (props: ImageProps) => {
  const { source, ...restProps } = props;

  return (
    <TurboImage
      source={{ uri: getConnectUrl(source.uri) ?? '' }}
      resizeMode="cover"
      {...restProps}
    />
  );
};

export default memo(Image);
