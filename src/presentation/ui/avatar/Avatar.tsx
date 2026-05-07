import { memo, PropsWithChildren } from 'react';
import { Image } from 'react-native';
import TurboImage from 'react-native-turbo-image';

import { getConnectUrl } from '@core/helpers';

import { AvatarProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const AVATAR_PLACEHOLDER = require('../../shared/images/avatar-placeholder.jpg');

const Avatar = (props: PropsWithChildren<AvatarProps>) => {
  const { uri, size = 28, imageProps, children } = props;

  return (
    <>
      {uri ? (
        <TurboImage
          {...imageProps}
          source={{ uri: getConnectUrl(uri) ?? '' }}
          rounded
          style={{ width: size, height: size }}
        />
      ) : (
        <Image
          source={AVATAR_PLACEHOLDER}
          style={{ width: size, height: size }}
          borderRadius={100}
        />
      )}

      {children}
    </>
  );
};

export default memo(Avatar);
