export interface IConfirmModalParams {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: PureFunction;
}

export type ConfirmModalShowFunc = (params: IConfirmModalParams) => void;

export interface IConfirmModal {
  show: ConfirmModalShowFunc;
  hide: PureFunction;
}
