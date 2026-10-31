import { ToastConfigParams } from 'react-native-toast-message';

import ErrorToast from './toast-components/error-toast';
import SuccessToast from './toast-components/success-toast';
import { Toasts } from './types';

// библиотека вызывает конфиг как функцию — рендерим элементом, чтобы хуки тостов
// жили в собственном компоненте, а не внутри ToastUI
const ToastConfig = {
  [Toasts.Error]: (props: ToastConfigParams<void>) => <ErrorToast {...props} />,
  [Toasts.Success]: (props: ToastConfigParams<void>) => <SuccessToast {...props} />,
};

export default ToastConfig;
export { Toasts };
