import ViewModelInjector from '@components/view-model-injector';

import ProfileDetailsView from './view';
import ProfileDetailsViewModel, { IProfileDetailsViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IProfileDetailsViewModel.$,
    implementation: ProfileDetailsViewModel,
  },
];

const ProfileDetailsScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <ProfileDetailsView />
    </ViewModelInjector>
  );
};

export default ProfileDetailsScreen;
