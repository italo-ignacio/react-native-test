import Toast from 'react-native-root-toast';
import type { ToastOptions } from 'react-native-root-toast';

const toastColor = {
  error: {
    backgroundColor: '',
    shadowColor: '',
    textColor: ''
  },
  loading: {
    backgroundColor: '',
    shadowColor: '',
    textColor: ''
  },
  success: {
    backgroundColor: '',
    shadowColor: '',
    textColor: ''
  },
  warning: {
    backgroundColor: '',
    shadowColor: '',
    textColor: ''
  }
};

export const renderToast = (
  message: string,
  variant: 'error' | 'loading' | 'success' | 'warning',
  options?: ToastOptions
): Toast => {
  const toastDefaultOptions: ToastOptions = toastColor[variant];

  const toast = Toast.show(message, {
    animation: true,
    duration: Toast.durations.LONG,
    hideOnPress: true,
    position: Toast.positions.TOP,
    shadow: true,
    ...toastDefaultOptions,
    ...options
  });

  return toast;
};

export const callToast = {
  error: (message: string, options?: ToastOptions): Toast => renderToast(message, 'error', options),
  loading: (message: string, options?: ToastOptions): Toast =>
    renderToast(message, 'loading', { ...options }),
  success: (message: string, options?: ToastOptions): Toast =>
    renderToast(message, 'success', options),
  warning: (message: string, options?: ToastOptions): Toast =>
    renderToast(message, 'warning', options)
};
