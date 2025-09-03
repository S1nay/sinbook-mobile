import { createRef } from 'react';

import { BottomSheetModalShowFunc, IBottomSheetModal } from './types';

export const BottomSheetModalRef = createRef<IBottomSheetModal>();

const getBottomSheetModal = (): IBottomSheetModal | null => {
  if (!BottomSheetModalRef.current) {
    if (__DEV__) {
      throw new Error('BottomSheetModal is not defined');
    }

    return null;
  }

  return BottomSheetModalRef.current;
};

const show: BottomSheetModalShowFunc = params => getBottomSheetModal()?.show(params);
const hide = () => getBottomSheetModal()?.hide();

export const BottomSheetModal = {
  show,
  hide,
};
