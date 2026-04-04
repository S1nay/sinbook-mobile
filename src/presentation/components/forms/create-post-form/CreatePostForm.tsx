import { useImperativeHandle, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';

import Icon from '@ui/icon';
import ImageCarousel from '@ui/image-carousel';
import Input from '@ui/input';
import MediaPicker from '@ui/media-picker';

import { CreatePostFormKeys } from './keys';
import styles from './styles';
import { CreatePostFormData, CreatePostFormProps } from './types';

const CAROUSEL_DIMENSIONS = 320;
const MAX_IMAGES = 10;

const CreatePostForm = (props: CreatePostFormProps) => {
  const { formParams, ref } = props;
  const form = useForm<CreatePostFormData>(formParams);

  useImperativeHandle(ref, () => form);

  const chosenImages = form.watch(CreatePostFormKeys.IMAGES);
  const remaining = MAX_IMAGES - chosenImages.length;

  const onPickImages = (assets: Array<Asset>) => {
    form.setValue(CreatePostFormKeys.IMAGES, [...chosenImages, ...assets]);
  };

  const ImagePlaceholder = useMemo(() => {
    return (
      remaining > 0 && (
        <MediaPicker
          selectionLimit={remaining}
          style={[styles.placeholder, { width: CAROUSEL_DIMENSIONS, height: CAROUSEL_DIMENSIONS }]}
          onPick={onPickImages}
        >
          <Icon name="imageLibrary" size={64} stroke="#BCC1CA" />
        </MediaPicker>
      )
    );
  }, [remaining]);

  return (
    <View>
      <Controller
        name={CreatePostFormKeys.IMAGES}
        control={form.control}
        render={({ field: { value }, fieldState: { error } }) => (
          <>
            <ImageCarousel
              images={value.map((asset: Asset) => asset.uri ?? '')}
              imageWidth={CAROUSEL_DIMENSIONS}
              imageHeight={CAROUSEL_DIMENSIONS}
              enablePagination={false}
              carouselStyle={[styles.carouselStyle, { width: CAROUSEL_DIMENSIONS }]}
              itemSpacing={16}
              imageStyle={styles.imageStyle}
              appendItem={ImagePlaceholder}
            />

            {!!error && <Text style={styles.imagesError}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        name={CreatePostFormKeys.CONTENT}
        control={form.control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
            <Input
              value={value}
              label="Description"
              placeholder="Enter description"
              error={error?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              maxLength={100}
            />
            <Text style={styles.charCounter}>{value.length}/100</Text>
          </>
        )}
      />
    </View>
  );
};

export default CreatePostForm;
