import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUnistyles } from 'react-native-unistyles';

import Header from '@components/header';
import { Identifiers } from '@core/di/identifiers';
import { AppRouteNames, AuthNavigator, MaintenanceNavigator } from '@navigation/configuration';
import LogScreen from '@screens/log-screen';
import { useDIContainer } from '@shared/hooks';

const RootStack = createNativeStackNavigator();

interface AppNavigatorProps {
  initialAuthed: boolean;
}

export const AppNavigator = ({ initialAuthed }: AppNavigatorProps) => {
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
      {/* Оба стека зарегистрированы всегда; стартовый выбирается по initialAuthed,
          дальнейшее переключение — императивно через NavigationService.reset из VM */}
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialAuthed ? AppRouteNames.Maintenance : AppRouteNames.Auth}
      >
        <RootStack.Screen component={MaintenanceNavigator} name={AppRouteNames.Maintenance} />
        <RootStack.Screen component={AuthNavigator} name={AppRouteNames.Auth} />
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
