import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, NativeSyntheticEvent, TextInputFocusEventData, TextInput, Text } from 'react-native';
import { MaskedTextInput, MaskedTextInputRef } from 'react-native-advanced-input-mask';
import { useUnistyles } from 'react-native-unistyles';

import { Masks } from '@shared/utils/masks';
import Icon from '@ui/icon';

import Label from './input-components/label';
import { styles } from './styles';
import { InputProps, InputState } from './types';

const Input = (props: InputProps) => {
  const {
    ref,
    mask,
    editable = true,
    variant = 'line-transparent',
    startIcon,
    endIcon,
    style,
    label,
    containerStyle,
    onChangeText,
    value,
    error,
    onFocus,
    onBlur,
    format,
    ...otherProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<MaskedTextInputRef>(null);

  const { theme } = useUnistyles();
  const placeholderTextColor = theme.components.input.placeholder;

  // Unistyles omits 'default' from variant types; use undefined for the base case.
  const activeState: Exclude<InputState, 'default'> | undefined = !editable
    ? 'disabled'
    : error
    ? 'error'
    : isFocused
    ? 'focused'
    : undefined;

  const iconColor = theme.components.input.icon[activeState ?? 'default'];

  styles.useVariants({
    variant,
    state: activeState,
    withStartIcon: !!startIcon,
    withEndIcon: !!endIcon,
  });

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const handleChangeText = useCallback(
    (val: string) => {
      const formattedValue = format?.(val) || val;
      onChangeText?.(formattedValue);
    },
    [value],
  );

  const handleFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, []);

  const handleBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, []);

  const renderInput = () => {
    const inputProps = {
      ...otherProps,
      value,
      editable,
      mask: mask ? Masks[mask] : '',
      style: [styles.inputField, style],
      placeholderTextColor,
      onChangeText: handleChangeText,
      onFocus: handleFocus,
      onBlur: handleBlur,
    };

    const BaseInput = mask ? MaskedTextInput : TextInput;

    return <BaseInput {...inputProps} />;
  };

  return (
    <View>
      <View style={[styles.wrapper, containerStyle]}>
        {startIcon && (
          <Icon
            {...startIcon}
            name={startIcon.name}
            style={styles.startIcon}
            stroke={iconColor}
            size={startIcon.size}
          />
        )}

        {variant === 'line-transparent' && <Label label={label} isError={!!error} />}

        {renderInput()}

        {endIcon && (
          <Icon
            {...endIcon}
            name={endIcon.name}
            style={styles.endIcon}
            stroke={iconColor}
            size={endIcon.size}
          />
        )}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default memo(Input);
