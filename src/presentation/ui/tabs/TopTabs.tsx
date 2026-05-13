import {
  Children,
  isValidElement,
  memo,
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { useWindowDimensions } from 'react-native';
import { Route, TabView } from 'react-native-tab-view';

import { TabBar, TabLabel, TabsContent } from './tabs-components';
import { TabsContentProps } from './tabs-components/tabs-content';
import { TopTabsProps } from './types';

const TopTabsContainer = (props: PropsWithChildren<TopTabsProps>) => {
  const { routes, children } = props;

  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const sceneMap = useMemo(() => {
    const items = Children.toArray(children).filter(
      (child): child is ReactElement<PropsWithChildren<TabsContentProps>> =>
        isValidElement(child) && child.type === TabsContent,
    );

    return Object.fromEntries(items.map(item => [item.props.routeKey, item.props.children]));
  }, [children]);

  const renderScene = ({ route }: { route: Route }) => sceneMap[route.key] ?? null;

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={TabBar}
      onIndexChange={setIndex}
      initialLayout={{ width }}
      commonOptions={{ label: TabLabel }}
    />
  );
};

export default memo(TopTabsContainer);
