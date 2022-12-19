import { combineReducers } from 'redux';

import exhibit from './exhibit';
import exhibits from './exhibits';
import settings from './settings';

export default combineReducers({
  exhibit,
  exhibits,
  settings,
});
