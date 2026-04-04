import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { IUser } from '@domain/models';

import {
  AppRouteNames,
  AuthRouteNames,
  BottomTabRouteNames,
  ChatRouteNames,
  MaintenanceRouteNames,
  ProfileRouteNames,
} from './routeNames';

// Типы для параметров экранов

export type RootStackParamList = {
  [AppRouteNames.Maintenance]: NavigatorScreenParams<MaintenanceStackParamList>;
  [AppRouteNames.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [AppRouteNames.Log]: undefined;
};

export type AuthStackParamList = {
  [AuthRouteNames.Login]: undefined;
  [AuthRouteNames.Register]: undefined;
};

export type MaintenanceStackParamList = {
  [MaintenanceRouteNames.Tab]: NavigatorScreenParams<BottomTabStackParamList>;
  [MaintenanceRouteNames.Notifications]: undefined;
};

export type BottomTabStackParamList = {
  [BottomTabRouteNames.Chat]: NavigatorScreenParams<ChatStackParamList>;
  [BottomTabRouteNames.Profile]: NavigatorScreenParams<ProfileStackParamList>;
  [BottomTabRouteNames.Home]: undefined;
  [BottomTabRouteNames.Search]: undefined;
  [BottomTabRouteNames.CreatePost]: undefined;
};

export type ProfileStackParamList = {
  [ProfileRouteNames.ProfileDetails]?: {
    userId?: number;
    userIsUpdated?: boolean;
    newPostIsCreated?: number;
  };
  [ProfileRouteNames.ProfilePosts]: {
    user: IUser;
  };
  [ProfileRouteNames.ProfileEdit]: {
    user: IUser;
  };
  [ProfileRouteNames.ProfileFollows]: undefined;
  [ProfileRouteNames.ProfileFollowers]: undefined;
};

export type ChatStackParamList = {
  [ChatRouteNames.Chat]: undefined;
  [ChatRouteNames.Chats]: undefined;
};

// Типы для props экранов
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MaintenanceScreenProps<T extends keyof MaintenanceStackParamList> =
  NativeStackScreenProps<MaintenanceStackParamList, T>;

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
