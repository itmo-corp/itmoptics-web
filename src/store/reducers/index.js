import { combineReducers } from 'redux';

import exhibits from './exhibits';
import settings from './settings';

export default combineReducers({
  exhibits,
  settings,
});
