import React from 'react';

import getContrastPaperColor from 'utils/getContrastPaperColor';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Exhibit from 'pages/Exhibit/index';
import Settings from 'pages/Settings';
import SettingsAppearance from 'pages/Settings/Appearance';
import SettingsImport from 'pages/Settings/ImportSettings';
import SettingsReader from 'pages/Settings/Reader';
import SettingsPrivacy from 'pages/Settings/Privacy';
import SettingsLanguage from 'pages/Settings/Language';

import AboutPage from 'pages/AboutPage';

const routes = [
  {
    path: ['/', '/exhibits'],
    component: <Home />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: theme => theme.palette.background.paper,
    alias: 'exhibits',
  },
  {
    path: '/exhibits/:id',
    component: <Exhibit />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => theme.palette.background.default,
    alias: 'exhibit',
  },
  {
    path: '/settings/reader',
    component: <SettingsReader />,
    title: 'Параметры чтения',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settingsReader',
  },
  {
    path: '/settings/privacy',
    component: <SettingsPrivacy />,
    title: 'Приватность',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settingsPrivacy',
  },
  {
    path: '/settings/import',
    component: <SettingsImport />,
    title: 'Импорт настроек',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settingsImport',
  },
  {
    path: '/settings/language',
    component: <SettingsLanguage />,
    title: 'Настройки языка',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settingsLanguage',
  },
  {
    path: '/settings/appearance',
    component: <SettingsAppearance />,
    title: 'Внешний вид',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settingsAppearance',
  },
  {
    path: '/settings',
    component: <Settings />,
    title: 'Настройки',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => getContrastPaperColor(theme),
    alias: 'settings',
  },
  {
    path: '/about',
    component: <AboutPage />,
    title: 'О проекте',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: theme => theme.palette.background.paper,
    alias: 'about',
  },
  {
    path: '/:404*',
    component: <NotFound />,
    title: '404',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: theme => theme.palette.background.default,
    alias: '404',
  },
];

export default routes;
