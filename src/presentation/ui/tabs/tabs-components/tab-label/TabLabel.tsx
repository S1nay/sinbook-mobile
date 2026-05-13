import { Text, useWindowDimensions, View } from 'react-native';

import styles from './styles';
import { TabLabelProps } from './types';

const TabLabel = (props: TabLabelProps) => {
  const { route, focused, labelText, routesCount = 1 } = props;
  const { width } = useWindowDimensions();

  styles.useVariants({ focused });

  return (
    <View style={[styles.labelWrapper, { minWidth: width / routesCount }]}>
      <Text style={styles.label}>{labelText ?? route.title}</Text>
    </View>
  );
};

export default TabLabel;
