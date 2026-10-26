import ViewModelInjector from '@components/view-model-injector';

import BootstrapGate from './view/BootstrapGate';
import { BootstrapViewModel, IBootstrapViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IBootstrapViewModel.$,
    implementation: BootstrapViewModel,
  },
];

const Bootstrap = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <BootstrapGate />
    </ViewModelInjector>
  );
};

export default Bootstrap;
