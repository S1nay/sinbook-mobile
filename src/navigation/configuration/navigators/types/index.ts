import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenOptions<T extends ParamListBase, N = unknown> = {
  route: RouteProp<T, keyof T>;
  navigation: N extends NativeStackNavigationProp<T>
    ? NativeStackNavigationProp<T>
    : BottomTabNavigationProp<T>;
  theme: ReactNavigation.Theme;
};
