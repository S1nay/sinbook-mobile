import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Icon from '@ui/icon';

import { styles } from './styles';
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

  const { theme } = useUnistyles();

  styles.useVariants({ checked: value });

  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onCheck}>
      <View {...otherProps} style={[styles.checkbox, style]}>
        {value && <Icon name="check" size={iconSize} stroke={theme.colors.foreground.inverse} />}
      </View>

      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

export default memo(Checkbox);
