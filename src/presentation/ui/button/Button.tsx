import { memo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Icon from '@ui/icon';

import { styles } from './styles';
import { ButtonProps, ButtonState } from './types';

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

  const { theme } = useUnistyles();
  // Unistyles omits 'default' from variant types; use undefined for the base case.
  const activeState: Exclude<ButtonState, 'default'> | undefined = disabled
    ? 'disabled'
    : isPressed
    ? 'pressed'
    : undefined;

  styles.useVariants({ variant, size, state: activeState });

  const iconColor =
    variant === 'primary'
      ? activeState === 'disabled'
        ? theme.components.button.primary.disabledFg
        : theme.components.button.primary.fg
      : activeState === 'disabled'
      ? theme.components.button.secondary.disabledFg
      : activeState === 'pressed'
      ? theme.components.button.secondary.pressedFg
      : theme.components.button.secondary.fg;

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
      style={[styles.root, style as StyleProp<ViewStyle>]}
      disabled={disabled}
      {...otherProps}
    >
      {icon && <Icon {...icon} stroke={icon.stroke ?? iconColor} />}

      <Text style={[styles.label, textStyle]}>{value}</Text>
      {isLoading && <ActivityIndicator color={iconColor} size={16} />}
    </Pressable>
  );
};

export default memo(Button);
