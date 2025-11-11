import ErrorToast from './toast-components/error-toast';
import SuccessToast from './toast-components/success-toast';
import { Toasts } from './types';

const ToastConfig = {
  [Toasts.Error]: ErrorToast,
  [Toasts.Success]: SuccessToast,
};

export default ToastConfig;
export { Toasts };
