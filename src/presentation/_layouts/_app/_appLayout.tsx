import { PropsWithChildren, useMemo } from 'react';
import { SafeAreaView, ScrollViewProps, View, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '@components/header';

import styles from './styles';
import { AppLayoutProps } from './types';

const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const { header, isScroll = false, children } = props;
  const insets = useSafeAreaInsets();

  const scrollViewProps: ScrollViewProps = useMemo(
    () => ({
      contentContainerStyle: styles.content,
      keyboardDismissMode: 'interactive',
      keyboardShouldPersistTaps: 'handled',
      automaticallyAdjustContentInsets: true,
      contentInsetAdjustmentBehavior: 'always',
      showsVerticalScrollIndicator: false,
    }),
    [],
  );

  const viewProps: ViewProps = useMemo(
    () => ({
      style: styles.content,
    }),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Header {...header} />

        {isScroll ? (
          <ScrollView {...scrollViewProps}>{children}</ScrollView>
        ) : (
          <View {...viewProps}>{children}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AppLayout;
