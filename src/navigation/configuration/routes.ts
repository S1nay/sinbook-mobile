import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSignedOut, useSignedIn } from '@core/providers/AuthProvider';
import Screens from '@screens/index';

import {
  AppRouteNames,
  AuthRouteNames,
  ChatRouteNames,
  ProfileRouteNames,
  BottomTabRouteNames,
} from './routeNames';
import type {
  AuthStackParamList,
  BottomTabStackParamList,
  ChatStackParamList,
  ProfileStackParamList,
} from './routeParams';

const ProfileNavigator = createNativeStackNavigator<ProfileStackParamList>({
  screens: {
    [ProfileRouteNames.ProfileDetails]: Screens.ProfileDetailsScreen,
    [ProfileRouteNames.ProfilePosts]: Screens.ProfilePostsScreen,
    [ProfileRouteNames.ProfileEdit]: Screens.ProfileEditScreen,
    [ProfileRouteNames.ProfileFollowList]: Screens.ProfileFollowListScreen,
  },
  initialRouteName: ProfileRouteNames.ProfileDetails,
});

const ChatNavigator = createNativeStackNavigator<ChatStackParamList>({
  screens: {
    [ChatRouteNames.Inbox]: Screens.InboxScreen,
    [ChatRouteNames.InboxList]: Screens.InboxListScreen,
  },
  initialRouteName: ChatRouteNames.Inbox,
});

const BottomTabNavigator = createBottomTabNavigator<BottomTabStackParamList>({
  screens: {
    [BottomTabRouteNames.Home]: Screens.HomeScreen,
    [BottomTabRouteNames.Search]: Screens.SearchScreen,
    [BottomTabRouteNames.CreatePost]: Screens.CreatePostScreen,
    [BottomTabRouteNames.Chat]: ChatNavigator,
    [BottomTabRouteNames.Profile]: ProfileNavigator,
  },
  initialRouteName: BottomTabRouteNames.Home,
  screenOptions: () => {
    return {
      headerShown: false,
    };
  },
});

export const AuthNavigator = createNativeStackNavigator<AuthStackParamList>({
  screens: {
    [AuthRouteNames.SignIn]: Screens.SignInScreen,
    [AuthRouteNames.SignUp]: Screens.SignUpScreen,
  },
  initialRouteName: AuthRouteNames.SignIn,
  screenOptions: () => {
    return {
      headerShown: false,
    };
  },
});

export const MainNavigator = createNativeStackNavigator({
  groups: {
    LoggedIn: {
      if: useSignedIn,
      screens: {
        [AppRouteNames.Maintenance]: BottomTabNavigator,
        [AppRouteNames.Notifications]: Screens.NotificationScreen,
      },
    },
    LoggedOut: {
      if: useSignedOut,
      screens: {
        [AppRouteNames.Auth]: AuthNavigator,
      },
    },
  },
  screenOptions: ({ route }) => {
    const isNotNavigator =
      route.name !== AppRouteNames.Auth && route.name !== AppRouteNames.Maintenance;

    return {
      headerShown: isNotNavigator,
    };
  },
});
