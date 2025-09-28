import { PropsWithChildren, useMemo } from 'react';
import { ScrollViewProps, View, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';
import { AppLayoutProps } from './types';

const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const { isScroll = false, children } = props;
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
    <View style={styles.global}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {isScroll ? (
          <ScrollView {...scrollViewProps}>{children}</ScrollView>
        ) : (
          <View {...viewProps}>{children}</View>
        )}
      </View>
    </View>
  );
};

export default AppLayout;
