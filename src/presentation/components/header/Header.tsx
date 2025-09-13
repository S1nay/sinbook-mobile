import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { BackHandler, Keyboard, Pressable, Text, View } from 'react-native';

import { Colors } from '@shared/colors';
import Icon from '@ui/icon/Icon';

import styles from './styles';
import { HeaderProps } from './types';

const Header = (props: HeaderProps) => {
  const { leftIcon = 'logo', rightIcon, title, onBackPress } = props;
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPressHandler);

    return backHandler.remove;
  }, []);

  const onBackPressHandler = () => {
    Keyboard.dismiss();

    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  };

  const LeftIcon = useCallback(() => {
    const isLogo = leftIcon !== 'leftArrow';

    return (
      <Pressable
        hitSlop={8}
        style={styles.headerLeftIcon}
        onPress={!isLogo ? onBackPressHandler : undefined}
      >
        <Icon
          name={leftIcon}
          size={isLogo ? 30 : 12}
          fill={isLogo ? Colors.black : Colors.lightGray}
        />
      </Pressable>
    );
  }, [leftIcon]);

  return (
    <View style={styles.container}>
      <View style={styles.headerLeftContainer}>
        <LeftIcon />

        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && <Icon {...rightIcon} />}
    </View>
  );
};

export default Header;
