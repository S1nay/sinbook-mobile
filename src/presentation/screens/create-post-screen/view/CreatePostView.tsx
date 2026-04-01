import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { Keyboard, View } from 'react-native';
import Toast from 'react-native-toast-message';

import Forms from '@components/forms';
import {
  CreatePostFormData,
  CreatePostFormRef,
  CreatePostFormValidationSchema,
} from '@components/forms/create-post-form';
import { useDIContainer } from '@core/hooks';
import AppLayout from '@layouts/_app';
import Button from '@ui/button';
import { Toasts } from '@ui/toast';

import { ICreatePostViewModel } from '../view-model';
import styles from './styles';

const CreatePostDefaultValues: CreatePostFormData = {
  content: '',
  images: [],
};

const CreatePostView = () => {
  const container = useDIContainer();
  const vm = container.get(ICreatePostViewModel.$);
  const form = useRef<CreatePostFormRef>(null);

  useEffect(() => {
    if (vm.isSuccess) {
      Toast.show({ text1: 'Post created successfully!', type: Toasts.Success });
      form.current?.reset(CreatePostDefaultValues);
      vm.reset();
    }
  }, [vm.isSuccess]);

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    form.current?.handleSubmit(vm.createPost)();
  }, [vm]);

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
          isLoading={vm.isLoading}
          disabled={vm.isLoading}
        />
      </View>
    </AppLayout>
  );
};

export default observer(CreatePostView);
