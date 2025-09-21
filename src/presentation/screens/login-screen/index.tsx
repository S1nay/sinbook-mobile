import ViewModelInjector from '@components/view-model-injector';

import LoginView from './view';
import LoginViewModelImpl, { ILoginViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: ILoginViewModel.$,
    implementation: LoginViewModelImpl,
  },
];

const LoginScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <LoginView />
    </ViewModelInjector>
  );
};

export default LoginScreen;
