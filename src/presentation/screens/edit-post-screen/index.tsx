import ViewModelInjector from '@components/view-model-injector';

import EditPostView from './view';
import EditPostViewModel, { IEditPostViewModel } from './view-model';

const viewModels: Array<Binding> = [
  {
    identifier: IEditPostViewModel.$,
    implementation: EditPostViewModel,
  },
];

const EditPostScreen = () => {
  return (
    <ViewModelInjector viewModels={viewModels}>
      <EditPostView />
    </ViewModelInjector>
  );
};

export default EditPostScreen;
