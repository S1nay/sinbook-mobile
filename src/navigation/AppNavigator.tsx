import { createStaticNavigation } from '@react-navigation/native';

import { MainNavigator } from './configuration';

const RootNavigation = createStaticNavigation(MainNavigator);

export const AppNavigator = () => {
  return <RootNavigation />;
};
