import { StyleProp, TextStyle } from 'react-native';
import { Route } from 'react-native-tab-view';

export interface TabLabelProps {
  route: Route;
  labelText?: string;
  focused: boolean;
  color: string;
  allowFontScaling?: boolean;
  style?: StyleProp<TextStyle>;
  routesCount?: number;
}
