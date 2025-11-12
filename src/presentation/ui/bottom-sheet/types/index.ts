import { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { ReactElement } from 'react';

export interface IBottomSheetModalParams {
  modal: ReactElement | null;
  config?: Omit<BottomSheetModalProps, 'children'> | null;
}

export type BottomSheetModalShowFunc = (params: IBottomSheetModalParams) => void;

export interface IBottomSheetModal {
  show: BottomSheetModalShowFunc;
  hide: PureFunction;
}
