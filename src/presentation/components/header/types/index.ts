import { IconProps } from '@ui/icon';

export interface HeaderProps {
  leftIcon?: 'logo' | 'leftArrow';
  rightIcon?: IconProps;
  title: string;
  onBackPress?: PureFunction;
}
