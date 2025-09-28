import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

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
import { defaultHeader } from './defaultHeader';

// Profile Navigator
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName={ProfileRouteNames.ProfileDetails}>
      <ProfileStack.Screen
        component={ProfileDetailsScreen}
        name={ProfileRouteNames.ProfileDetails}
      />
      <ProfileStack.Screen
        options={params =>
          defaultHeader<ParamListBase, NativeStackNavigationProp<ParamListBase>>(params)
        }
        component={ProfileEditScreen}
        name={ProfileRouteNames.ProfileEdit}
      />
      <ProfileStack.Screen
        options={params =>
          defaultHeader<ParamListBase, NativeStackNavigationProp<ParamListBase>>(params)
        }
        component={ProfileFollowListScreen}
        name={ProfileRouteNames.ProfileFollowList}
      />
      <ProfileStack.Screen
        options={params =>
          defaultHeader<ParamListBase, NativeStackNavigationProp<ParamListBase>>(params)
        }
        component={ProfilePostsScreen}
        name={ProfileRouteNames.ProfilePosts}
      />
    </ProfileStack.Navigator>
  );
};

// Chat Navigator
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator initialRouteName={ChatRouteNames.Chats}>
      <ChatStack.Screen
        options={params =>
          defaultHeader<ParamListBase, NativeStackNavigationProp<ParamListBase>>(params)
        }
        component={ChatsScreen}
        name={ChatRouteNames.Chats}
      />
      <ChatStack.Screen
        options={{ header: props => <Header {...props} isShowBackIcon isShowRightIcon={false} /> }}
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
        headerShown:
          route.name !== BottomTabRouteNames.Profile && route.name !== BottomTabRouteNames.Chat,
      })}
      tabBar={props => {
        const currentRoute = props.state.routes.find((_, index) => index === props.state.index);

        if (currentRoute?.name !== BottomTabRouteNames.CreatePost) {
          return <BottomTabBar {...(props as BottomTabBarProps)} />;
        }
      }}
      initialRouteName={BottomTabRouteNames.Home}
    >
      <TabStack.Screen
        options={params =>
          defaultHeader<BottomTabStackParamList, BottomTabNavigationProp<BottomTabStackParamList>>(
            params,
          )
        }
        component={HomeScreen}
        name={BottomTabRouteNames.Home}
      />
      <TabStack.Screen
        options={params =>
          defaultHeader<BottomTabStackParamList, BottomTabNavigationProp<BottomTabStackParamList>>(
            params,
          )
        }
        component={SearchScreen}
        name={BottomTabRouteNames.Search}
      />
      <TabStack.Screen
        options={params =>
          defaultHeader<BottomTabStackParamList, BottomTabNavigationProp<BottomTabStackParamList>>(
            params,
          )
        }
        component={CreatePostScreen}
        name={BottomTabRouteNames.CreatePost}
      />
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
          header: props => <Header {...props} isShowRightIcon={false} isShowBackIcon />,
        }}
      />
    </MaintenanceStack.Navigator>
  );
};
