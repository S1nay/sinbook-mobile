import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';
import { Keyboard, View } from 'react-native';

import Forms from '@components/forms';
import { PostFormData, PostFormRef, PostFormValidationSchema } from '@components/forms/post-form';
import AppLayout from '@layouts/_app';
import { MaintenanceRouteNames, MaintenanceScreenProps } from '@navigation/configuration';
import { useDIContainer } from '@shared/hooks';
import Button from '@ui/button';

import { IEditPostViewModel } from '../view-model';
import styles from './styles';

const EditPostView = () => {
  const container = useDIContainer();
  const { params } = useRoute<MaintenanceScreenProps<MaintenanceRouteNames.EditPost>['route']>();
  const { getPost, updatePost, isLoading } = container.get(IEditPostViewModel.$);
  const form = useRef<PostFormRef>(null);

  const post = getPost(params.postId);

  const onSubmit = (data: PostFormData) => {
    updatePost(params.postId, data);
  };

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    form.current?.handleSubmit(onSubmit)();
  }, [form.current]);

  return (
    <AppLayout>
      <View style={styles.container}>
        <Forms.PostForm
          ref={form}
          formParams={{
            defaultValues: {
              content: post?.content ?? '',
              images: post?.images.map(uri => ({ uri })) ?? [],
            },
            resolver: zodResolver(PostFormValidationSchema()),
          }}
        />

        <Button
          value="Save"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading || !post}
        />
      </View>
    </AppLayout>
  );
};

export default observer(EditPostView);
