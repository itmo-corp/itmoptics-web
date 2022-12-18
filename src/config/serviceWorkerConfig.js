import { NEEDS_UPDATE_KEY } from 'config/constants';
import LocalStorage from 'utils/LocalStorage';

const config = {
  onUpdate: registration => {
    console.log(
      '%c[info] %cUnregister current service worker',
      'color: #2979ff;',
      'color: #e9e9e9;'
    );
    registration
      .unregister()
      .then(() => {
        window.postMessage('showUpdateNotification', process.env.REACT_APP_PUBLIC_URL);
        LocalStorage.set(NEEDS_UPDATE_KEY, true);
        console.log(
          '%c[info] %cSent showUpdateNotification message from SW',
          'color: #2979ff;',
          'color: #e9e9e9;'
        );
      })
      .catch(e => console.log(
        '%c[error] %cUnable to unregister service worker:',
        'color: #ff5252;', 'color: #e9e9e9;', e)
      );
  },
  onSuccess: () => {
    window.postMessage('showUpdateSuccessNotification', process.env.REACT_APP_PUBLIC_URL);
    console.log(
      '%c[success] %cService worker succeed in registration.',
      'color: #00e676;',
      'color: #e9e9e9;'
    );
  },
};

export default config;
