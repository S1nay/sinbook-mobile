import { createRef } from 'react';

import { ConfirmModalShowFunc, IConfirmModal } from './types';

export const ConfirmModalRef = createRef<IConfirmModal>();

const getConfirmModal = (): IConfirmModal | null => {
  if (!ConfirmModalRef.current) {
    if (__DEV__) {
      throw new Error('ConfirmModal is not defined');
    }

    return null;
  }

  return ConfirmModalRef.current;
};

const show: ConfirmModalShowFunc = params => getConfirmModal()?.show(params);
const hide = () => getConfirmModal()?.hide();

export const ConfirmModal = {
  show,
  hide,
};
