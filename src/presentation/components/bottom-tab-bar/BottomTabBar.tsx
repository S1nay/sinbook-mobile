import { Pressable, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { BottomTabRouteNames, ChatRouteNames, ProfileRouteNames } from '@navigation/configuration';
import Icon from '@ui/icon';

import styles from './styles';
import { BottomTabBarProps, BottomTabIcons, BottomTabRoute } from './types';

const icons: BottomTabIcons = {
  [BottomTabRouteNames.Home]: 'home',
  [BottomTabRouteNames.Search]: 'search',
  [BottomTabRouteNames.Chat]: 'chat',
  [BottomTabRouteNames.Profile]: 'user',
};

const BottomTabBar = (props: BottomTabBarProps) => {
  const { state, navigation, insets } = props;
  const { theme } = useUnistyles();

  const onPress = (route: BottomTabRoute, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      switch (route.name) {
        case BottomTabRouteNames.Chat: {
          navigation.navigate(route.name, {
            screen: ChatRouteNames.Chats,
            initial: false,
          });
          break;
        }
        case BottomTabRouteNames.Profile: {
          navigation.navigate(route.name, {
            screen: ProfileRouteNames.ProfileDetails,
            initial: false,
          });
          break;
        }
        default: {
          navigation.navigate(route.name);
        }
      }
    }
  };

  const onLongPress = (route: BottomTabRoute) => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const renderTab = (route: BottomTabRoute, index: number) => {
    const isFocused = state.index === index;

    return (
      <Pressable
        key={index}
        onPress={() => onPress(route, isFocused)}
        onLongPress={() => onLongPress(route)}
        style={styles.tab}
      >
        {route.name === BottomTabRouteNames.CreatePost ? (
          <View style={styles.createPost}>
            <Text style={styles.createPostText}>+</Text>
          </View>
        ) : (
          <>
            <Icon
              name={icons[route.name]}
              size={24}
              stroke={isFocused ? theme.colors.accent.default : theme.colors.foreground.primary}
            />

            {isFocused && <View style={styles.tabBottomBorder} />}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      {state.routes.map(renderTab)}
    </View>
  );
};

export default BottomTabBar;
