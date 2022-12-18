import generateTheme from 'config/theme';
import * as userSettings from 'utils/userSettings';

import { SET_SETTINGS, GET_SETTINGS } from './types';

const userLocalSettings = userSettings.get();
const theme = generateTheme(userLocalSettings.themeType);

const initialState = {
  theme,
  ...userLocalSettings,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload);
      const shouldUpdateTheme = !!payload.themeType;
      return {
        ...newSettings,
        theme: shouldUpdateTheme ? generateTheme(newSettings.themeType) : state.theme,
      };
    }

    case GET_SETTINGS:
      return { theme: state.theme, ...userSettings.get() };

    default:
      return state;
  }
};
