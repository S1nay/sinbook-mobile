import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';

import { AppRouteNames } from '@navigation/configuration';
import Icon from '@ui/icon';

import styles from './styles';
import { AuthLayoutProps } from './types';

const AuthLayout = (props: PropsWithChildren<AuthLayoutProps>) => {
  const { title, children } = props;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, string, undefined>>();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();

  const onLog = () => {
    if (__DEV__) {
      navigation.navigate(AppRouteNames.Log);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable onPress={Keyboard.dismiss} style={styles.inner}>
          <Icon
            name="logo"
            size={96}
            style={styles.icon}
            fill={theme.colors.foreground.primary}
            onLongPress={onLog}
          />

          <Text style={styles.title}>{title}</Text>

          <View style={styles.content}>{children}</View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthLayout;
