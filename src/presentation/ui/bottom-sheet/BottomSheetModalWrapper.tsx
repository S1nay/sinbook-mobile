import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetModalRef } from './BottomSheetModal';
import { BottomSheetModalShowFunc, IBottomSheetModalParams } from './types';

const BottomSheetModalWrapper = () => {
  const [state, setState] = useState<IBottomSheetModalParams>({ modal: null, config: null });
  const insets = useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    let backHandlerSubscription: NativeEventSubscription | null = null;

    if (state.modal) bottomSheetModalRef.current?.present();

    if (state.modal) {
      backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
        hide();

        return true;
      });
    }

    return () => {
      return backHandlerSubscription?.remove();
    };
  }, [state]);

  const show = useCallback<BottomSheetModalShowFunc>(params => {
    setState(params);
  }, []);

  const hide = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useImperativeHandle(BottomSheetModalRef, () => ({ show, hide }), []);

  const onDismiss = () => {
    setState({ modal: null, config: null });
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
        {...props}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      enableDynamicSizing
      topInset={insets.top}
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}
    >
      {state.modal}
    </BottomSheetModal>
  );
};

export default BottomSheetModalWrapper;
