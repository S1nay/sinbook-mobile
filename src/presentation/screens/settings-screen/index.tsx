import ViewModelInjector from '@components/view-model-injector';

import SettingsView from './view/SettingsView';
import { ISettingsViewModel, SettingsViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: ISettingsViewModel.$,
    implementation: SettingsViewModel,
  },
];

const SettingsScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <SettingsView />
    </ViewModelInjector>
  );
};

export default SettingsScreen;
