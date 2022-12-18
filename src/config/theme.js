import * as userSettings from 'utils/userSettings';

import {
  BACKGROUND_COLORS_DEFAULT,
  BACKGROUND_COLORS_PAPER,
  THEME_TYPES,
  THEME_PRIMARY_COLORS,
  THEME_TEXT_COLORS,
} from './constants';

export const makeBackgroundColors = t => ({
  default: BACKGROUND_COLORS_DEFAULT[t],
  paper: BACKGROUND_COLORS_PAPER[t],
});

export const makePrimaryColors = t => THEME_PRIMARY_COLORS[t];

export const makeTextColors = t => THEME_TEXT_COLORS[t];

export const makeType = t => THEME_TYPES[t];

const generateTheme = themeType => {
  const localStorageUserSettings = userSettings.get();
  const localStorageCustomThemes = localStorageUserSettings.customThemes;
  const localStorageThemeType = localStorageUserSettings.themeType;

  const type = localStorageThemeType || 'light';
  const customTheme = localStorageCustomThemes.find(e => e.type === type);
  const defaultPalette = {
    type: makeType(themeType || type),
    primary: makePrimaryColors(themeType || type),
    background: makeBackgroundColors(themeType || type),
    text: makeTextColors(themeType || type),
  };

  return {
    palette: customTheme ? customTheme.palette : defaultPalette,
    shape: { borderRadius: 4 },
    overrides: {
      MuiTab: {
        wrapper: {
          flexDirection: 'row',
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    props: {
      MuiIconButton: {
        TouchRippleProps: {
          classes: {
            rippleVisible: 'IconButton_TouchRipple-rippleVisible',
            childLeaving: 'IconButton_TouchRipple-childLeaving',
          },
        },
      },
    },
  };
};

export default generateTheme;
