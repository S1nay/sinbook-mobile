import ViewModelInjector from '@components/view-model-injector';

import CreatePostView from './view';
import CreatePostViewModelImpl, { ICreatePostViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: ICreatePostViewModel.$,
    implementation: CreatePostViewModelImpl,
  },
];

const CreatePostScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <CreatePostView />
    </ViewModelInjector>
  );
};

export default CreatePostScreen;
