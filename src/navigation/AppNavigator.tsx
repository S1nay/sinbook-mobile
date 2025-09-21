import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Identifiers } from '@core/di/identifiers';
import { useAuth, useDIContainer } from '@core/hooks';
import { AppRouteNames, AuthNavigator, MaintenanceNavigator } from '@navigation/configuration';
import { Colors } from '@shared/colors';

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const RootStack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuth } = useAuth();
  const navigationService = useDIContainer().get(Identifiers.NavigationService);

  return (
    <NavigationContainer theme={NavigationTheme} ref={navigationService.navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <RootStack.Screen component={MaintenanceNavigator} name={AppRouteNames.Maintenance} />
        ) : (
          <RootStack.Screen component={AuthNavigator} name={AppRouteNames.Auth} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
