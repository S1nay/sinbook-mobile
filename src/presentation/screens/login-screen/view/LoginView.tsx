import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { Keyboard, Text, View } from 'react-native';

import Forms from '@components/forms';
import {
  LoginFormData,
  LoginFormRef,
  LoginFormValidationSchema,
} from '@components/forms/login-form';
import { useAuth, useDIContainer } from '@core/hooks';
import AuthLayout from '@layouts/_auth';
import { AuthRouteNames, AuthScreenProps } from '@navigation/configuration';
import Button from '@ui/button';
import ErrorMessage from '@ui/error';

import { ILoginViewModel } from '../view-model';
import styles from './styles';

const LoginFormDefaultValues: LoginFormData = {
  email: '',
  password: '',
  isRememberMe: false,
};

const LoginView = () => {
  const container = useDIContainer();
  const { login, formErrors, error, isLoading, isSuccess } = container.get(ILoginViewModel.$);
  const form = useRef<LoginFormRef>(null);
  const { authorize } = useAuth();
  const navigation = useNavigation<AuthScreenProps<AuthRouteNames.Login>['navigation']>();

  useEffect(() => {
    if (isSuccess) {
      authorize();
    }
  }, [isSuccess]);

  const onSubmit = (formData: LoginFormData) => {
    Keyboard.dismiss();
    login(formData);
  };

  const navigateToRegistration = () => navigation.navigate(AuthRouteNames.Register);

  const handleSubmitForm = useCallback(() => {
    form.current?.handleSubmit(onSubmit)();
  }, [form.current]);

  return (
    <AuthLayout title="Sign In">
      <View>
        {error && <ErrorMessage message={error} style={styles.errorContainer} />}

        <Forms.LoginForm
          ref={form}
          externalErrors={formErrors}
          formParams={{
            defaultValues: LoginFormDefaultValues,
            resolver: zodResolver(LoginFormValidationSchema()),
          }}
        />

        <Button
          isLoading={isLoading}
          style={styles.submitButton}
          value="Sign In"
          onPress={handleSubmitForm}
          disabled={isLoading}
        />
      </View>

      <Text style={styles.bottomText} onPress={navigateToRegistration}>
        Don&apos;t have an account? <Text style={styles.registrationText}>Sign up</Text>
      </Text>
    </AuthLayout>
  );
};

export default observer(LoginView);
