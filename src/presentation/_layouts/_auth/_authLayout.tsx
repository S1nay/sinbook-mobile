import { PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@shared/colors';
import Icon from '@ui/icon';

import styles from './styles';
import { AuthLayoutProps } from './types';

const PADDING_TOP = 24;

const AuthLayout = (props: PropsWithChildren<AuthLayoutProps>) => {
  const { title, children } = props;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: insets.top + PADDING_TOP }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable onPress={Keyboard.dismiss} style={styles.inner}>
          <Icon name="logo" size={96} style={styles.icon} fill={Colors.black} />

          <Text style={styles.title}>{title}</Text>

          {children}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthLayout;
