import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import 'react-toastify/dist/ReactToastify.css';

export function ToastMessage() {
  const toastState = useSelector((state: RootState) => state.toastState);
  // will invoke toast message when selected state in redux changes
  useEffect(() => {
    (() => {
      switch (toastState.toastType) {
        case 'info':
          return (() => {
            toast.info(toastState.toastMessage);
          })();
        case 'success':
          return (() => {
            toast.success(toastState.toastMessage);
          })();
        case 'warning':
          return (() => {
            toast.warn(toastState.toastMessage);
          })();
        case 'error':
          return (() => {
            toast.error(toastState.toastMessage);
          })();
        default:
          return null;
      }
    })();
  }, [toastState]);
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={5000}
      pauseOnHover
      hideProgressBar={true}
      newestOnTop={true}
    />
  );
}

export default ToastMessage;
