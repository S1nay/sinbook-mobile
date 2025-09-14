import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSignedIn } from '@core/providers/AuthProvider';
import { Colors } from '@shared/colors';

import { AppRouteNames, AuthNavigator, MaintenanceNavigator } from './configuration';

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const RootStack = createNativeStackNavigator();

export const AppNavigator = () => {
  const isSignedIn = useSignedIn();

  return (
    <NavigationContainer theme={NavigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <RootStack.Screen component={MaintenanceNavigator} name={AppRouteNames.Maintenance} />
        ) : (
          <RootStack.Screen component={AuthNavigator} name={AppRouteNames.Auth} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
