import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, NativeSyntheticEvent, TextInputFocusEventData, TextInput, Text } from 'react-native';
import { MaskedTextInput, MaskedTextInputRef } from 'react-native-advanced-input-mask';

import { Masks } from '@shared/utils/masks';
import Icon from '@ui/icon';

import { getInputConfig } from './config';
import Label from './input-components/label';
import styles from './styles';
import { InputProps } from './types';

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

  const cfg = getInputConfig({
    variant,
    focused: isFocused,
    disabled: !editable,
    error: !!error,
    startIcon: !!startIcon,
    endIcon: !!endIcon,
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
      style: [cfg.input, style],
      onChangeText: handleChangeText,
      onFocus: handleFocus,
      onBlur: handleBlur,
    };

    const BaseInput = mask ? MaskedTextInput : TextInput;

    return <BaseInput {...inputProps} />;
  };

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {startIcon && (
          <Icon
            {...startIcon}
            name={startIcon.name}
            style={[styles.startIcon, cfg.startIcon]}
            stroke={cfg.endIcon.color}
            size={startIcon.size}
          />
        )}

        {variant === 'line-transparent' && <Label label={label} isError={!!error} />}

        {renderInput()}

        {endIcon && (
          <Icon
            {...endIcon}
            name={endIcon.name}
            style={[styles.endIcon, cfg.endIcon]}
            stroke={cfg.endIcon.color}
            size={endIcon.size}
          />
        )}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default memo(Input);
