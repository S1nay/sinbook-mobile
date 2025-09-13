import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  AppRouteNames,
  AuthRouteNames,
  BottomTabRouteNames,
  ChatRouteNames,
  ProfileRouteNames,
} from './routeNames';

// Типы для параметров экранов
export type ProfileStackParamList = {
  [ProfileRouteNames.ProfileDetails]: undefined;
  [ProfileRouteNames.ProfilePosts]: undefined;
  [ProfileRouteNames.ProfileEdit]: undefined;
  [ProfileRouteNames.ProfileFollowList]: undefined;
};

export type ChatStackParamList = {
  [ChatRouteNames.Inbox]: undefined;
  [ChatRouteNames.InboxList]: undefined;
};

export type AuthStackParamList = {
  [AuthRouteNames.SignIn]: undefined;
  [AuthRouteNames.SignUp]: undefined;
};

export type RootStackParamList = {
  [AppRouteNames.Maintenance]: NavigatorScreenParams<BottomTabStackParamList>;
  [AppRouteNames.Notifications]: undefined;
  [AppRouteNames.Auth]: NavigatorScreenParams<AuthStackParamList>;
};

export type BottomTabStackParamList = {
  [BottomTabRouteNames.Chat]: NavigatorScreenParams<ChatStackParamList>;
  [BottomTabRouteNames.Profile]: NavigatorScreenParams<ProfileStackParamList>;
  [BottomTabRouteNames.Home]: undefined;
  [BottomTabRouteNames.Search]: undefined;
  [BottomTabRouteNames.CreatePost]: undefined;
};

// Типы для props экранов
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type BottomTabScreenProps<T extends keyof BottomTabStackParamList> = NativeStackScreenProps<
  BottomTabStackParamList,
  T
>;

export type ProfileScreenProps<T extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  T
>;

export type ChatScreenProps<T extends keyof ChatStackParamList> = NativeStackScreenProps<
  ChatStackParamList,
  T
>;

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;
