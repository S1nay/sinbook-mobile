import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useRef, useEffect, useCallback } from 'react';
import { View } from 'react-native';

import Forms from '@components/forms';
import {
  EditProfileFormData,
  EditProfileFormRef,
  EditProfileFormValidationSchema,
} from '@components/forms/edit-profile-form';
import Header from '@components/header';
import { useDIContainer } from '@core/hooks';
import AppLayout from '@layouts/_app';
import { ProfileScreenProps, ProfileRouteNames } from '@navigation/configuration';
import Button from '@ui/button';

import styles from './styles';
import { IProfileEditViewModel } from '../view-model';

const ProfileEditView = () => {
  const container = useDIContainer();
  const navigation =
    useNavigation<ProfileScreenProps<ProfileRouteNames.ProfileEdit>['navigation']>();
  const { params } = useRoute<ProfileScreenProps<ProfileRouteNames.ProfileEdit>['route']>();
  const { updateUser, uploadAvatar, isLoading } = container.get(IProfileEditViewModel.$);

  const form = useRef<EditProfileFormRef>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.user.nickName,
      header: props => <Header {...props} isShowBackIcon isShowRightIcon={false} />,
    });
  }, [params.user]);

  const onSubmit = async (formData: EditProfileFormData) => {
    if (formData.avatarBlob) {
      const avatar = await uploadAvatar(formData.avatarBlob);
      if (avatar) {
        updateUser(formData, avatar.url);
      }
    } else {
      updateUser(formData);
    }
  };

  const handleSubmitForm = useCallback(() => {
    if (form.current) {
      form.current.handleSubmit(onSubmit)();
    }
  }, [form]);

  return (
    <AppLayout isScroll disableBottomInsets>
      <View style={styles.container}>
        <Forms.EditProfileForm
          ref={form}
          formParams={{
            defaultValues: {
              name: params.user.name,
              nickname: params.user.nickName.replace('@', ''),
              avatarPath: params.user.avatarPath,
              biography: params.user.biography,
            },
            resolver: zodResolver(EditProfileFormValidationSchema()),
          }}
        />

        <Button
          value="Save profile"
          icon={{ name: 'pencil', size: 16 }}
          onPress={handleSubmitForm}
          isLoading={isLoading}
        />
      </View>
    </AppLayout>
  );
};

export default observer(ProfileEditView);
