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
    <Pressable style={[styles.container, containerStyle]} onPress={onCheck}>
      <View
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
      >
        {value && <Icon name="check" size={iconSize} stroke={Colors.white} />}
      </View>

      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

export default memo(Checkbox);
