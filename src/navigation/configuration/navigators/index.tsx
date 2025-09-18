import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar, { BottomTabBarProps } from '@components/bottom-tab-bar';
import Header from '@components/header';
import ChatScreen from '@screens/chat-screen';
import ChatsScreen from '@screens/chats-screen';
import CreatePostScreen from '@screens/create-post-screen';
import HomeScreen from '@screens/home-screen';
import LoginScreen from '@screens/login-screen';
import NotificationsScreen from '@screens/notifications-screen';
import ProfileDetailsScreen from '@screens/profile-details-screen';
import ProfileEditScreen from '@screens/profile-edit-screen';
import ProfileFollowListScreen from '@screens/profile-follow-list-screen';
import ProfilePostsScreen from '@screens/profile-posts-screen';
import RegisterScreen from '@screens/register-screen';
import SearchScreen from '@screens/search-screen';

import {
  ChatRouteNames,
  ProfileRouteNames,
  BottomTabRouteNames,
  MaintenanceRouteNames,
  AuthRouteNames,
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
        component={ProfileDetailsScreen}
        name={ProfileRouteNames.ProfileDetails}
      />
      <ProfileStack.Screen component={ProfileEditScreen} name={ProfileRouteNames.ProfileEdit} />
      <ProfileStack.Screen
        component={ProfileFollowListScreen}
        name={ProfileRouteNames.ProfileFollowList}
      />
      <ProfileStack.Screen component={ProfilePostsScreen} name={ProfileRouteNames.ProfilePosts} />
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
        component={ChatsScreen}
        name={ChatRouteNames.Chats}
      />
      <ChatStack.Screen
        options={{
          header: props => <Header {...props} isShowBackIcon isShowNotificationIcon={false} />,
        }}
        component={ChatScreen}
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
      <TabStack.Screen component={HomeScreen} name={BottomTabRouteNames.Home} />
      <TabStack.Screen component={SearchScreen} name={BottomTabRouteNames.Search} />
      <TabStack.Screen component={CreatePostScreen} name={BottomTabRouteNames.CreatePost} />
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
      <AuthStack.Screen component={LoginScreen} name={AuthRouteNames.Login} />
      <AuthStack.Screen component={RegisterScreen} name={AuthRouteNames.Register} />
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
        component={NotificationsScreen}
        name={MaintenanceRouteNames.Notifications}
        options={{
          headerTitle: 'Notifications',
          header: props => <Header {...props} isShowNotificationIcon={false} isShowBackIcon />,
        }}
      />
    </MaintenanceStack.Navigator>
  );
};
