import { memo, useState } from 'react';
import { Pressable, Text } from 'react-native';

import { getButtonConfig } from './config';
import styles from './styles';
import { ButtonProps } from './types';
import Icon from '../icon/Icon';

const Button = (props: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { variant = 'primary', size = 'large', icon, value, disabled, ...otherProps } = props;

  const cfg = getButtonConfig({ pressed: isPressed, disabled, variant, size });

  const handlePressIn = () => {
    if (!disabled) setIsPressed(true);
  };
  const handlePressOut = () => {
    if (!disabled) setIsPressed(false);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.base, cfg.container]}
      {...otherProps}
    >
      {icon && <Icon name={icon.name} size={icon.size} stroke={cfg.icon.color} />}

      <Text style={cfg.text}>{value}</Text>
    </Pressable>
  );
};

export default memo(Button);
