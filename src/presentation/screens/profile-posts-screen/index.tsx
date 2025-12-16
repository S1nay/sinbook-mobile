import ViewModelInjector from '@components/view-model-injector';

import ProfilePostsView from './view';
import ProfilePostsViewModel, { IProfilePostsViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IProfilePostsViewModel.$,
    implementation: ProfilePostsViewModel,
  },
];

const ProfilePostsScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <ProfilePostsView />
    </ViewModelInjector>
  );
};

export default ProfilePostsScreen;
