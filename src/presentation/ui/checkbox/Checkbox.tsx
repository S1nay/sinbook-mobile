/* eslint-disable react-native/no-inline-styles */
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Colors } from '@shared/colors';
import Icon from '@ui/icon';

import styles from './styles';
import { CheckboxProps } from './types';

const Checkbox = (props: CheckboxProps) => {
  const {
    value,
    label,
    style,
    labelStyle,
    containerStyle,
    iconSize = 12,
    onCheck,
    ...otherProps
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...otherProps}
        style={[
          styles.checkbox,
          {
            backgroundColor: value ? Colors.lightOrange : Colors.transparent,
            borderWidth: !value ? 1 : 0,
            borderColor: !value ? Colors.gray : '',
          },
          style,
        ]}
        onPress={onCheck}
      >
        {value && <Icon name="check" size={iconSize} stroke={Colors.white} />}
      </Pressable>

      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

export default memo(Checkbox);
