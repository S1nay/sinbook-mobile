import { ScrollViewProps } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

export interface AppLayoutProps {
  isScroll?: boolean;
  scrollViewProps?: ScrollViewProps;
  viewProps?: ViewProps;
  disableBottomInsets?: boolean;
}
