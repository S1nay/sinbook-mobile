import { PropsWithChildren, useMemo } from 'react';
import { ScrollViewProps, View, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';
import { AppLayoutProps } from './types';

const AppLayout = (props: PropsWithChildren<AppLayoutProps>) => {
  const {
    isScroll = false,
    children,
    scrollViewProps: additionalScrollViewProps,
    viewProps: additionalViewProps,
    disableBottomInsets = false,
  } = props;
  const insets = useSafeAreaInsets();

  const scrollViewProps: ScrollViewProps = useMemo(
    () => ({
      ...additionalScrollViewProps,
      contentContainerStyle: [styles.content, additionalScrollViewProps?.contentContainerStyle],
      keyboardDismissMode: 'interactive',
      keyboardShouldPersistTaps: 'handled',
      automaticallyAdjustContentInsets: true,
      contentInsetAdjustmentBehavior: 'always',
      showsVerticalScrollIndicator: false,
    }),
    [additionalScrollViewProps],
  );

  const viewProps: ViewProps = useMemo(
    () => ({
      ...additionalViewProps,
      style: [styles.content, additionalViewProps?.style],
    }),
    [additionalViewProps],
  );

  return (
    <View style={styles.global}>
      <View style={[styles.container, !disableBottomInsets && { paddingBottom: insets.bottom }]}>
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
