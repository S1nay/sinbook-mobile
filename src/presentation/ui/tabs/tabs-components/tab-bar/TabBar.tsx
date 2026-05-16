import { Route, TabBarProps, TabBar as TabBarComponent } from 'react-native-tab-view';

import styles from './styles';

const TabBar = (props: TabBarProps<Route>) => {
  return (
    <TabBarComponent
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      indicatorContainerStyle={styles.indicatorContainer}
    />
  );
};

export default TabBar;
