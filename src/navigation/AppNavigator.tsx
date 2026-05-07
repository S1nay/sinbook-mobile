import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUnistyles } from 'react-native-unistyles';

import Header from '@components/header';
import { Identifiers } from '@core/di/identifiers';
import { useAuth, useDIContainer } from '@core/hooks';
import { AppRouteNames, AuthNavigator, MaintenanceNavigator } from '@navigation/configuration';
import LogScreen from '@screens/log-screen';

const RootStack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuth } = useAuth();
  const { theme } = useUnistyles();
  const navigationService = useDIContainer().get(Identifiers.NavigationService);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.primary,
        },
      }}
      ref={navigationService.navigationRef}
    >
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuth ? AppRouteNames.Maintenance : AppRouteNames.Auth}
      >
        {isAuth ? (
          <RootStack.Screen component={MaintenanceNavigator} name={AppRouteNames.Maintenance} />
        ) : (
          <RootStack.Screen component={AuthNavigator} name={AppRouteNames.Auth} />
        )}
        <RootStack.Screen
          component={LogScreen}
          name={AppRouteNames.Log}
          options={{
            headerShown: true,
            header: props => <Header {...props} isShowRightIcon={false} isShowBackIcon />,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
