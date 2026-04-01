import { useEffect, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Asset } from 'react-native-image-picker';

import { Colors } from '@shared/colors';
import Avatar from '@ui/avatar';
import Icon from '@ui/icon';
import Input from '@ui/input';
import MediaPicker from '@ui/media-picker';

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

  const onPickAvatar = ([asset]: Array<Asset>) => {
    form.setValue(EditProfileFormKeys.AVATAR_BLOB, asset);
    form.setValue(EditProfileFormKeys.AVATAR, asset.uri ?? '');
  };

  return (
    <View style={[styles.container, formStyle]}>
      <Controller
        control={form.control}
        name={EditProfileFormKeys.AVATAR}
        render={({ field: { value } }) => (
          <MediaPicker style={styles.avatar} onPick={onPickAvatar}>
            <Avatar uri={value} size={160}>
              <View style={styles.editIcon}>
                <Icon size={24} name={'pencil'} stroke={Colors.black} />
              </View>
            </Avatar>
          </MediaPicker>
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
