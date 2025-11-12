import ViewModelInjector from '@components/view-model-injector';

import ProfileEditView from './view';
import ProfileEditViewModel, { IProfileEditViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IProfileEditViewModel.$,
    implementation: ProfileEditViewModel,
  },
];

const ProfileDetailsScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <ProfileEditView />
    </ViewModelInjector>
  );
};

export default ProfileDetailsScreen;
