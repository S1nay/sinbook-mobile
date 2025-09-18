import { memo } from 'react';

import { icons } from '@shared/icons';

import { IconProps } from './types';

const Icon = (props: IconProps) => {
  const { name, size, ...otherProps } = props;

  const Icon = icons[name];

  return <Icon width={size} height={size} {...otherProps} />;
};

export default memo(Icon);
