import {
  BottomTabNavigationEventMap,
  BottomTabBarProps as NavigationBottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { TabNavigationState, NavigationHelpers, NavigationRoute } from '@react-navigation/native';

import { BottomTabRouteNames, BottomTabStackParamList } from '@navigation/configuration';
import { IconProps } from '@ui/icon';

export interface BottomTabBarProps {
  state: TabNavigationState<BottomTabStackParamList>;
  descriptors: NavigationBottomTabBarProps['descriptors'];
  navigation: NavigationHelpers<BottomTabStackParamList, BottomTabNavigationEventMap>;
  insets: NavigationBottomTabBarProps['insets'];
}

export type BottomTabIconNames = Exclude<BottomTabRouteNames, BottomTabRouteNames.CreatePost>;

export type BottomTabIcons = Record<BottomTabIconNames, IconProps['name']>;

export type BottomTabRoute = NavigationRoute<
  BottomTabStackParamList,
  keyof BottomTabStackParamList
>;
