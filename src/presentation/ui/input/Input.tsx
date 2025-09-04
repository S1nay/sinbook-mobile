import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { View, NativeSyntheticEvent, TextInputFocusEventData, TextInput } from 'react-native';
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
    name,
    mask,
    editable = true,
    variant = 'line-transparent',
    startIcon,
    endIcon,
    style,
    label,
    containerStyle,
    labelStyle,
    onFocus,
    onBlur,
    format,
    ...otherProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<MaskedTextInputRef>(null);
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  const cfg = getInputConfig({
    variant,
    focused: isFocused,
    disabled: !editable,
    error: !!error?.message,
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

      onChange?.(formattedValue);
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

      <Label
        label={label}
        isFocused={isFocused}
        config={cfg}
        value={value}
        labelStyle={labelStyle}
      />

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
  );
};

export default memo(Input);
