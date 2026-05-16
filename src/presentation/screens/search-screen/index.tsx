import ViewModelInjector from '@components/view-model-injector';

import SearchView from './view';
import RegisterViewModel, { ISearchViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: ISearchViewModel.$,
    implementation: RegisterViewModel,
  },
];

const RegisterScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <SearchView />
    </ViewModelInjector>
  );
};

export default RegisterScreen;
