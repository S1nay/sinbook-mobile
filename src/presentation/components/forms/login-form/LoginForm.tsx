import { useEffect, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import Input from '@ui/input';
import SecurityInput from '@ui/security-input';

import { LoginFormKeys } from './keys';
import styles from './styles';
import { LoginFormData, LoginFormKeysType, LoginFormProps } from './types';

const LoginForm = (props: LoginFormProps) => {
  const { externalErrors, formParams, ref, formStyle } = props;

  const form = useForm<LoginFormData>(formParams);

  useImperativeHandle(ref, () => form);

  useEffect(() => {
    if (externalErrors) {
      const errorKeys = Object.keys(externalErrors) as Array<LoginFormKeysType>;

      errorKeys.forEach(key => form.setError(key, { message: externalErrors[key] }));
    }
  }, [externalErrors]);

  return (
    <View style={[styles.container, formStyle]}>
      <Controller
        name={LoginFormKeys.EMAIL}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            value={value}
            label="Email"
            placeholder="Enter your email"
            error={error?.message}
            onChangeText={onChange}
            onBlur={onBlur}
            startIcon={{ name: 'mail', size: 16 }}
          />
        )}
      />

      <Controller
        name={LoginFormKeys.PASSWORD}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <SecurityInput
            value={value}
            label="Password"
            error={error?.message}
            placeholder="Enter your password"
            onChangeText={onChange}
            onBlur={onBlur}
            startIcon={{ name: 'lock', size: 16 }}
          />
        )}
      />
    </View>
  );
};

export default LoginForm;
