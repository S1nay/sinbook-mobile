import { memo } from 'react';
import { Text } from 'react-native';

import { styles } from './styles';
import { LabelProps } from './types';

const Label = (props: LabelProps) => {
  const { label, isError } = props;

  styles.useVariants({ isError });

  return <Text style={styles.label}>{label}</Text>;
};

export default memo(Label);
