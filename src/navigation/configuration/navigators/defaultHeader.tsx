import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { CommonActions, ParamListBase } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '@components/header';

import { MaintenanceRouteNames } from '../routeNames';
import { ScreenOptions } from './types';

export const defaultHeader = <T extends ParamListBase, N = unknown>({
  navigation,
}: ScreenOptions<T, N>) => ({
  header: (
    props: N extends NativeStackNavigationProp<T> ? NativeStackHeaderProps : BottomTabHeaderProps,
  ) => (
    <Header
      {...props}
      onPressRightIcon={() =>
        navigation.dispatch(CommonActions.navigate(MaintenanceRouteNames.Notifications))
      }
    />
  ),
});
