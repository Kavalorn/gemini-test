import { toast } from 'react-toastify';
import { isErrorWithMessage } from '../store/services/accounts/types'

export function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }


  export const showError = (error) => {
    if(isErrorWithMessage(error)) toast.error(error.data.message);
  }