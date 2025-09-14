import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export interface HeaderProps extends NativeStackHeaderProps {
  isShowBackIcon?: boolean;
  isShowNotificationIcon?: boolean;
}

export interface TabHeaderProps extends BottomTabHeaderProps {
  isShowBackIcon?: boolean;
  isShowNotificationIcon?: boolean;
}
