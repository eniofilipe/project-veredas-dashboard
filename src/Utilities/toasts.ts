import { toast } from 'react-toastify';

const success = (message: string, onClose?: () => void) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose,
  });

const error = (message: string, errorMessage?: any) => {
  const fullMessage = errorMessage ? `${message}\t${errorMessage}` : message;

  toast.error(fullMessage, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const dismiss = () => toast.dismiss();

const toasts = { success, error, dismiss };

export default toasts;
