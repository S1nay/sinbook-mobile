import ViewModelInjector from '@components/view-model-injector';

import RegisterView from './view';
import RegisterViewModel, { IRegisterViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IRegisterViewModel.$,
    implementation: RegisterViewModel,
  },
];

const RegisterScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <RegisterView />
    </ViewModelInjector>
  );
};

export default RegisterScreen;
