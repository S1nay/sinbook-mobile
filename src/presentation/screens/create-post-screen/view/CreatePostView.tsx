import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';
import { Keyboard, View } from 'react-native';

import Forms from '@components/forms';
import { PostFormData, PostFormRef, PostFormValidationSchema } from '@components/forms/post-form';
import AppLayout from '@layouts/_app';
import { useDIContainer } from '@shared/hooks';
import Button from '@ui/button';

import { ICreatePostViewModel } from '../view-model';
import styles from './styles';

const CreatePostDefaultValues: PostFormData = {
  content: '',
  images: [],
};

const CreatePostView = () => {
  const container = useDIContainer();
  const { createPost, isLoading } = container.get(ICreatePostViewModel.$);
  const form = useRef<PostFormRef>(null);

  const onSubmit = (data: PostFormData) => {
    createPost(data, () => form.current?.reset(CreatePostDefaultValues));
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
            defaultValues: CreatePostDefaultValues,
            resolver: zodResolver(PostFormValidationSchema()),
          }}
        />

        <Button
          value="Create Post"
          icon={{ name: 'add', size: 20 }}
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </AppLayout>
  );
};

export default observer(CreatePostView);
