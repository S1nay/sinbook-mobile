import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { Keyboard, Text, View } from 'react-native';

import Forms from '@components/forms';
import {
  RegisterFormData,
  RegisterFormRef,
  RegisterFormValidationSchema,
} from '@components/forms/register-form';
import { useAuth, useDIContainer } from '@core/hooks';
import AuthLayout from '@layouts/_auth';
import { AuthRouteNames, AuthScreenProps } from '@navigation/configuration';
import Button from '@ui/button';
import ErrorMessage from '@ui/error';

import styles from './styles';
import { IRegisterViewModel } from '../view-model';

const RegisterFormDefaultValues: RegisterFormData = {
  biography: '',
  email: '',
  name: '',
  nickName: '',
  password: '',
};

const RegisterView = () => {
  const container = useDIContainer();
  const { register, formErrors, error, isLoading, isSuccess } = container.get(IRegisterViewModel.$);
  const form = useRef<RegisterFormRef>(null);
  const { authorize } = useAuth();
  const navigation = useNavigation<AuthScreenProps<AuthRouteNames.Register>['navigation']>();

  useEffect(() => {
    if (isSuccess) {
      authorize();
    }
  }, [isSuccess]);

  const onSubmit = (formData: RegisterFormData) => {
    Keyboard.dismiss();
    register(formData);
  };

  const navigateToLogin = () => navigation.navigate(AuthRouteNames.Login);

  const handleSubmitForm = useCallback(() => {
    form.current?.handleSubmit(onSubmit)();
  }, [form.current]);

  return (
    <AuthLayout title="Sign Up">
      <View>
        {error && <ErrorMessage message={error} style={styles.errorContainer} />}

        <Forms.RegisterForm
          externalErrors={formErrors}
          ref={form}
          formParams={{
            defaultValues: RegisterFormDefaultValues,
            resolver: zodResolver(RegisterFormValidationSchema()),
          }}
        />

        <Button
          isLoading={isLoading}
          style={styles.submitButton}
          value="Sign Up"
          onPress={handleSubmitForm}
          disabled={isLoading}
        />
      </View>

      <Text style={styles.bottomText} onPress={navigateToLogin}>
        Already have an account? <Text style={styles.loginText}>Sign in</Text>
      </Text>
    </AuthLayout>
  );
};

export default observer(RegisterView);
