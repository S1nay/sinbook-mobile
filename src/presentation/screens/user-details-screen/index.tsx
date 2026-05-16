import ViewModelInjector from '@components/view-model-injector';

import UserDetailsView from './view';
import { IUserDetailsViewModel, UserDetailsViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IUserDetailsViewModel.$,
    implementation: UserDetailsViewModel,
  },
];

const UserDetailsScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <UserDetailsView />
    </ViewModelInjector>
  );
};

export default UserDetailsScreen;
