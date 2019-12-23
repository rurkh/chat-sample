import {toast} from 'react-toastify';

export const showToast = (type, message) => {
  switch (type) {
    case 0:
      toast.error(message);
      break;
    case 1:
      toast.success(message);
      break;
    default:
      break;
  }
};
