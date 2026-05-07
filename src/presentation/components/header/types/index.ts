import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export interface HeaderProps extends NativeStackHeaderProps {
  isShowBackIcon?: boolean;
  rightIcon?: 'logout' | 'bell' | 'threeDots';
  isShowRightIcon?: boolean;
  onPressRightIcon?: PureFunction;
}

export interface TabHeaderProps extends BottomTabHeaderProps {
  isShowBackIcon?: boolean;
  rightIcon?: 'logout' | 'bell' | 'threeDots';
  isShowRightIcon?: boolean;
  onPressRightIcon?: PureFunction;
}
