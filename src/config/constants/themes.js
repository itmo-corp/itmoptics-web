import React from 'react';

import {
  darken,
  alpha,
  lighten,
} from '@material-ui/core';

import { blue } from '@material-ui/core/colors';

import {
  Document,
  InfoSquare,
  Setting,
} from 'react-iconly';

export const THEMES = [
  'light',
  'dark',
  'oled',
  'sepia',
  'dimmed',
  'itmoptics',
];

export const THEME_TYPES = {
  light: 'light',
  dark: 'dark',
  oled: 'dark',
  sepia: 'light',
  dimmed: 'dark',
  itmoptics: 'dark',
};

export const THEME_NAMES = {
  light: 'Светлая',
  dark: 'Тёмная',
  oled: 'OLED',
  sepia: 'Ночной режим',
  dimmed: 'Ночная тема',
  itmoptics: 'Тема IT[M]Optics',
};

/** Colors for app background */
export const BACKGROUND_COLORS_DEFAULT = {
  light: '#f5f5f5',
  dark: '#0e0e0e',
  oled: '#000000',
  sepia: '#f5e2a8',
  dimmed: '#1c2128',
  itmoptics: '#2d1d55',
};

/** Colors for app foreground elements, such as Paper */
export const BACKGROUND_COLORS_PAPER = {
  light: '#ffffff',
  dark: '#181818',
  oled: '#0e0e0e',
  sepia: '#ffecb3',
  dimmed: '#252c35',
  itmoptics: '#351f64',
};

export const THEME_PRIMARY_COLORS = {
  light: {
    main: blue.A400,
    light: blue.A200,
    dark: blue.A700,
  },
  dark: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
  oled: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
  sepia: {
    main: '#679f9d',
    light: lighten('#679f9d', 0.05),
    dark: darken('#679f9d', 0.1),
  },
  dimmed: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
  itmoptics: {
    main: '#c5b5da',
    light: '#b8b1bd',
    dark: '#b09ada',
  },
};

export const THEME_TEXT_COLORS = {
  light: {
    primary: 'rgb(0, 0, 0, 0.87)',
    secondary: 'rgb(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  dark: {
    primary: '#e9e9e9',
    secondary: alpha('#e9e9e9', 0.54),
    disabled: alpha('#e9e9e9', 0.38),
    hint: alpha('#e9e9e9', 0.38),
  },
  oled: {
    primary: '#e9e9e9',
    secondary: alpha('#e9e9e9', 0.54),
    disabled: alpha('#e9e9e9', 0.38),
    hint: alpha('#e9e9e9', 0.38),
  },
  sepia: {
    primary: '#5b4636',
    secondary: alpha('#5b4636', 0.54),
    disabled: alpha('#5b4636', 0.38),
    hint: alpha('#5b4636', 0.38),
  },
  dimmed: {
    primary: '#cdd9e5',
    secondary: alpha('#cdd9e5', 0.54),
    disabled: alpha('#cdd9e5', 0.38),
    hint: alpha('#cdd9e5', 0.38),
  },
  itmoptics: {
    primary: '#cdd9e5',
    secondary: alpha('#cdd9e5', 0.54),
    disabled: alpha('#cdd9e5', 0.38),
    hint: alpha('#cdd9e5', 0.38),
  },
};

export const makeNavigationTabs = (
  w = 24,
  h = 24,
  replaceProfile = false
) => {
  const size = Math.max(w, h);
  const tabs = [
    {
      label: 'Новости',
      icon: <Document set="light" size={size} />,
      to: () => '/exhibits',
      tab: 'exhibits',
      match: 'exhibits',
    },
    {
      label: 'О нас',
      icon: <InfoSquare set="light" size={size} />,
      to: () => '/about',
      match: 'about',
      tab: 'about',
    },
  ];
  if (replaceProfile) {
    tabs.push({
      label: 'Настройки',
      icon: <Setting set="light" size={size} />,
      to: () => '/settings',
      match: [
        'settings',
        'settingsAppearance',
        'settingsInterface',
        'settingsPrivacy',
        'settingsNewTheme',
        'settingsEditTheme',
        'settingsReader',
        'settingsLanguage',
      ],
      tab: 'settings',
    });
  }
  return tabs;
};
