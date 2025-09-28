import { useEffect, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import Input from '@ui/input';
import SecurityInput from '@ui/security-input';

import { RegisterFormKeys } from './keys';
import styles from './styles';
import { RegisterFormKeysType, RegisterFormProps, RegisterFormData } from './types';

const LoginForm = (props: RegisterFormProps) => {
  const { externalErrors, formParams, ref, formStyle } = props;

  const form = useForm<RegisterFormData>(formParams);

  useImperativeHandle(ref, () => form);

  useEffect(() => {
    if (externalErrors) {
      const errorKeys = Object.keys(externalErrors) as Array<RegisterFormKeysType>;

      errorKeys.forEach(key => form.setError(key, { message: externalErrors[key] }));
    }
  }, [externalErrors]);

  return (
    <View style={[styles.container, formStyle]}>
      <Controller
        name={RegisterFormKeys.EMAIL}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            value={value}
            label="Email"
            placeholder="Enter your email"
            error={error?.message}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name={RegisterFormKeys.PASSWORD}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <SecurityInput
            value={value}
            label="Password"
            error={error?.message}
            placeholder="Enter your password"
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name={RegisterFormKeys.NAME}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            value={value}
            label="Name"
            placeholder="Enter your name"
            error={error?.message}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name={RegisterFormKeys.NICKNAME}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            value={value}
            label="Nickname"
            error={error?.message}
            placeholder="Enter your nickname"
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name={RegisterFormKeys.BIOGRAPHY}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            value={value}
            label="Biography"
            error={error?.message}
            placeholder="Enter your biography"
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
    </View>
  );
};

export default LoginForm;
