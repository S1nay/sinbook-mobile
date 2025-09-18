/* eslint-disable react-native/no-inline-styles */
import { memo } from 'react';
import { Text } from 'react-native';

import { Colors } from '@shared/colors';

import styles from './styles';
import { LabelProps } from './types';

const Label = (props: LabelProps) => {
  const { label, isError } = props;

  return <Text style={[styles.label, isError && { color: Colors.red }]}>{label}</Text>;
};

export default memo(Label);
