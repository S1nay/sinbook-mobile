import { getHeaderTitle } from '@react-navigation/elements';
import { useEffect } from 'react';
import { BackHandler, Keyboard, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';

import { AppRouteNames } from '@navigation/configuration';
import Icon from '@ui/icon/Icon';

import styles from './styles';
import { HeaderProps, TabHeaderProps } from './types';

type AppHeaderProps = HeaderProps | TabHeaderProps;

const Header = (props: AppHeaderProps) => {
  const {
    isShowBackIcon = false,
    rightIcon = 'bell',
    isShowRightIcon = true,
    onPressRightIcon,
    navigation,
    options,
    route,
  } = props;
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPressHandler);

    return backHandler.remove;
  }, []);

  const onBackPressHandler = () => {
    Keyboard.dismiss();

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  };

  const onOpenLog = () => {
    if (__DEV__) {
      navigation.navigate(AppRouteNames.Log);
    }
  };

  const headerTitle =
    typeof options.headerTitle !== 'function'
      ? (props: React.ComponentProps<typeof Text>) => (
          <Text style={styles.title} {...props}>
            {getHeaderTitle(options, route.name)}
          </Text>
        )
      : options.headerTitle;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerLeftContainer}>
        <Pressable
          hitSlop={8}
          style={styles.headerLeftIcon}
          onPress={isShowBackIcon ? onBackPressHandler : undefined}
        >
          <Icon
            name={isShowBackIcon ? 'leftArrow' : 'logo'}
            size={!isShowBackIcon ? 30 : 16}
            fill={theme.colors.foreground.primary}
          />
        </Pressable>

        <Pressable onLongPress={onOpenLog}>
          {headerTitle?.({ children: getHeaderTitle(options, route.name), ...props.options })}
        </Pressable>
      </View>

      {isShowRightIcon && (
        <Pressable style={styles.headerRightIcon} onPress={onPressRightIcon}>
          <Icon name={rightIcon} size={24} stroke={theme.colors.foreground.primary} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
