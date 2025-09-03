import { SvgProps } from 'react-native-svg';

import { icons } from '@shared/icons';

export interface IconProps extends SvgProps {
  size: number;
  name: keyof typeof icons;
}
