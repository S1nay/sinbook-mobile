import { useEffect, useImperativeHandle, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Modals from '@components/sheet-modals';
import { IOption } from '@components/sheet-modals/list-options-sheet-modal';
import { Colors } from '@shared/colors';
import Avatar from '@ui/avatar';
import { BottomSheetModal } from '@ui/bottom-sheet';
import Icon from '@ui/icon';
import Input from '@ui/input';

import { EditProfileFormKeys } from './keys';
import styles from './styles';
import { EditProfileFormData, EditProfileFormKeysType, EditProfileFormProps } from './types';

const EditProfileForm = (props: EditProfileFormProps) => {
  const { externalErrors, formParams, ref, formStyle } = props;

  const form = useForm<EditProfileFormData>(formParams);

  useImperativeHandle(ref, () => form);

  useEffect(() => {
    if (externalErrors) {
      const errorKeys = Object.keys(externalErrors) as Array<EditProfileFormKeysType>;

      errorKeys.forEach(key => form.setError(key, { message: externalErrors[key] }));
    }
  }, [externalErrors]);

  const modalOptions = useMemo<Array<IOption>>(
    () => [
      {
        title: 'Open image library',
        onPress: () => launchImageLibrary({ mediaType: 'photo' }, handleSetAvatar),
        icon: {
          name: 'imageLibrary',
          size: 24,
          stroke: Colors.black,
        },
      },
      {
        title: 'Open camera',
        onPress: () => launchCamera({ mediaType: 'photo' }, handleSetAvatar),
        icon: {
          name: 'camera',
          size: 24,
          stroke: Colors.black,
        },
      },
    ],
    [],
  );

  const onOpenImagePickerSheet = () => {
    BottomSheetModal.show({
      modal: <Modals.ListOptionsSheetModal options={modalOptions} />,
    });
  };

  const onCloseImagePickerSheet = () => {
    BottomSheetModal.hide();
  };

  const handleSetAvatar = async (imageResponse: ImagePickerResponse) => {
    if (imageResponse.didCancel) {
      onOpenImagePickerSheet();
    } else {
      onCloseImagePickerSheet();

      if (imageResponse.assets) {
        const asset = imageResponse.assets[0];

        form.setValue(EditProfileFormKeys.AVATAR_BLOB, asset);
        form.setValue(EditProfileFormKeys.AVATAR, asset.uri ?? '');
      }
    }
  };

  return (
    <View style={[styles.container, formStyle]}>
      <Controller
        control={form.control}
        name={EditProfileFormKeys.AVATAR}
        render={({ field: { value } }) => (
          <Avatar uri={value} size={160} style={styles.avatar} onPress={onOpenImagePickerSheet}>
            <View style={styles.editIcon}>
              <Icon size={24} name={'pencil'} stroke={Colors.black} />
            </View>
          </Avatar>
        )}
      />

      <Controller
        control={form.control}
        name={EditProfileFormKeys.NICKNAME}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label={'Nickname'}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            placeholder="Enter your nickname"
          />
        )}
      />

      <Controller
        control={form.control}
        name={EditProfileFormKeys.NAME}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label={'Name'}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            placeholder="Enter your name"
          />
        )}
      />

      <Controller
        control={form.control}
        name={EditProfileFormKeys.BIOGRAPHY}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label={'Biography'}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            placeholder="Enter your biography"
          />
        )}
      />
    </View>
  );
};

export default EditProfileForm;
