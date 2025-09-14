import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar, { BottomTabBarProps } from '@components/bottom-tab-bar';
import Header from '@components/header';
import Screens from '@screens/index';

import {
  ChatRouteNames,
  ProfileRouteNames,
  BottomTabRouteNames,
  AuthRouteNames,
  MaintenanceRouteNames,
} from '../routeNames';
import type {
  AuthStackParamList,
  BottomTabStackParamList,
  ChatStackParamList,
  MaintenanceStackParamList,
  ProfileStackParamList,
} from '../routeParams';

// Profile Navigator
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ProfileRouteNames.ProfileDetails}
    >
      <ProfileStack.Screen
        component={Screens.ProfileDetailsScreen}
        name={ProfileRouteNames.ProfileDetails}
      />
      <ProfileStack.Screen
        component={Screens.ProfileEditScreen}
        name={ProfileRouteNames.ProfileEdit}
      />
      <ProfileStack.Screen
        component={Screens.ProfileFollowListScreen}
        name={ProfileRouteNames.ProfileFollowList}
      />
      <ProfileStack.Screen
        component={Screens.ProfilePostsScreen}
        name={ProfileRouteNames.ProfilePosts}
      />
    </ProfileStack.Navigator>
  );
};

// Chat Navigator
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ChatRouteNames.Chats}
    >
      <ChatStack.Screen
        options={{ header: props => <Header {...props} /> }}
        component={Screens.ChatsScreen}
        name={ChatRouteNames.Chats}
      />
      <ChatStack.Screen
        options={{
          header: props => <Header {...props} isShowBackIcon isShowNotificationIcon={false} />,
        }}
        component={Screens.ChatScreen}
        name={ChatRouteNames.Chat}
      />
    </ChatStack.Navigator>
  );
};

// Bottom Tab Navigator
const TabStack = createBottomTabNavigator<BottomTabStackParamList>();

const TabNavigator = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        header: props => (
          <Header {...props} isShowBackIcon={route.name === BottomTabRouteNames.CreatePost} />
        ),
      })}
      tabBar={props => {
        const currentRoute = props.state.routes.find((_, index) => index === props.state.index);

        if (currentRoute?.name !== BottomTabRouteNames.CreatePost) {
          return <BottomTabBar {...(props as BottomTabBarProps)} />;
        }
      }}
      initialRouteName={BottomTabRouteNames.Home}
    >
      <TabStack.Screen component={Screens.HomeScreen} name={BottomTabRouteNames.Home} />
      <TabStack.Screen component={Screens.SearchScreen} name={BottomTabRouteNames.Search} />
      <TabStack.Screen component={Screens.CreatePostScreen} name={BottomTabRouteNames.CreatePost} />
      <TabStack.Screen component={ChatNavigator} name={BottomTabRouteNames.Chat} />
      <TabStack.Screen component={ProfileNavigator} name={BottomTabRouteNames.Profile} />
    </TabStack.Navigator>
  );
};

//Auth Navigator
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen component={Screens.SignInScreen} name={AuthRouteNames.SignIn} />
      <AuthStack.Screen component={Screens.SignUpScreen} name={AuthRouteNames.SignUp} />
    </AuthStack.Navigator>
  );
};

// Maintenance Navigator
const MaintenanceStack = createNativeStackNavigator<MaintenanceStackParamList>();

export const MaintenanceNavigator = () => {
  return (
    <MaintenanceStack.Navigator initialRouteName={MaintenanceRouteNames.Tab}>
      <MaintenanceStack.Screen
        options={{ headerShown: false }}
        component={TabNavigator}
        name={MaintenanceRouteNames.Tab}
      />
      <MaintenanceStack.Screen
        component={Screens.NotificationScreen}
        name={MaintenanceRouteNames.Notifications}
        options={{
          headerTitle: 'Notifications',
          header: props => <Header {...props} isShowNotificationIcon={false} isShowBackIcon />,
        }}
      />
    </MaintenanceStack.Navigator>
  );
};
