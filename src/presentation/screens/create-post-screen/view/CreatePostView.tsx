import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';
import { Keyboard, View } from 'react-native';

import Forms from '@components/forms';
import {
  CreatePostFormData,
  CreatePostFormRef,
  CreatePostFormValidationSchema,
} from '@components/forms/create-post-form';
import { useDIContainer } from '@core/hooks';
import AppLayout from '@layouts/_app';
import Button from '@ui/button';

import { ICreatePostViewModel } from '../view-model';
import styles from './styles';

const CreatePostDefaultValues: CreatePostFormData = {
  content: '',
  images: [],
};

const CreatePostView = () => {
  const container = useDIContainer();
  const { createPost, isLoading } = container.get(ICreatePostViewModel.$);
  const form = useRef<CreatePostFormRef>(null);

  const onSubmit = (data: CreatePostFormData) => {
    createPost(data, () => form.current?.reset(CreatePostDefaultValues));
  };

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    form.current?.handleSubmit(onSubmit)();
  }, [form.current]);

  return (
    <AppLayout>
      <View style={styles.container}>
        <Forms.CreatePostForm
          ref={form}
          formParams={{
            defaultValues: CreatePostDefaultValues,
            resolver: zodResolver(CreatePostFormValidationSchema()),
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
