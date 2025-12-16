import { memo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleProp, Text, ViewStyle } from 'react-native';

import Icon from '@ui/icon';

import { getButtonConfig } from './config';
import styles from './styles';
import { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const {
    variant = 'primary',
    size = 'large',
    icon,
    value,
    disabled,
    textStyle,
    style,
    isLoading = false,
    ...otherProps
  } = props;

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
      style={[styles.base, cfg.container, style as StyleProp<ViewStyle>]}
      disabled={disabled}
      {...otherProps}
    >
      {icon && <Icon {...icon} stroke={cfg.icon.color || icon.stroke} />}

      <Text style={[cfg.text, textStyle]}>{value}</Text>
      {isLoading && <ActivityIndicator color={cfg.loader.color} size={16} />}
    </Pressable>
  );
};

export default memo(Button);
