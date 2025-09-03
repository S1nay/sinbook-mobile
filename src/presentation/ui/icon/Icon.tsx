import { memo } from 'react';

import { IconProps } from './types';
import { icons } from '../../shared/icons';

const Icon = (props: IconProps) => {
  const { name, size, ...otherProps } = props;

  const Icon = icons[name];

  return <Icon width={size} height={size} {...otherProps} />;
};

export default memo(Icon);
