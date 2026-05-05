import { useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import SheetModals from '@components/sheet-modals';
import { IOption } from '@components/sheet-modals/list-options-sheet-modal';
import { Colors } from '@shared/colors';
import { BottomSheetModal } from '@ui/bottom-sheet';

import { MediaPickerProps } from './types';

const MediaPicker = (props: MediaPickerProps) => {
  const { onPick, selectionLimit, style, children } = props;

  const handleResponse = useCallback(
    (response: ImagePickerResponse) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        BottomSheetModal.hide();
        onPick(response.assets as Asset[]);
      }
    },
    [onPick],
  );

  const modalOptions = useMemo<IOption[]>(
    () => [
      {
        title: 'Open image library',
        onPress: () => launchImageLibrary({ mediaType: 'photo', selectionLimit }, handleResponse),
        icon: { name: 'imageLibrary', size: 24, stroke: Colors.black },
      },
      {
        title: 'Open camera',
        onPress: () => launchCamera({ mediaType: 'photo' }, handleResponse),
        icon: { name: 'camera', size: 24, stroke: Colors.black },
      },
    ],
    [selectionLimit, handleResponse],
  );

  const open = useCallback(() => {
    BottomSheetModal.show({
      modal: <SheetModals.ListOptionsSheetModal options={modalOptions} />,
    });
  }, [modalOptions]);

  return (
    <Pressable style={style} onPress={open}>
      {children}
    </Pressable>
  );
};

export default MediaPicker;
