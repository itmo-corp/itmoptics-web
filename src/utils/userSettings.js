import { DEFAULT_USER_SETTINGS, THEMES, USER_SETTINGS_KEY } from '../config/constants';
import LocalStorage from './LocalStorage';

export const get = () => {
  const data = localStorage.getItem(USER_SETTINGS_KEY);
  let res;

  if (!data) return DEFAULT_USER_SETTINGS;

  try {
    res = JSON.parse(data);
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data);
    return DEFAULT_USER_SETTINGS;
  }

  Object.keys(DEFAULT_USER_SETTINGS).forEach(key => {
    if (!res[key]) {
      res[key] = DEFAULT_USER_SETTINGS[key];
    } else if (key === 'themeType') {
      const { themeType, customThemes = [] } = res;
      const isThemeInDefaultThemes = THEMES.find(e => e === themeType);
      const isThemeInCustomThemes = customThemes.find(e => e.type === themeType);

      if (!isThemeInDefaultThemes && !isThemeInCustomThemes) {
        res.themeType = DEFAULT_USER_SETTINGS.themeType;
      }
    }
  });
  return res;
};

export const set = payload => {
  const data = get() || DEFAULT_USER_SETTINGS;

  Object.keys(payload).forEach(key => {
    data[key] = payload[key];
  });

  LocalStorage.set(USER_SETTINGS_KEY, data);
  return data;
};
