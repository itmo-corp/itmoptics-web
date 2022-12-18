export const HOUR = 1000 * 60 * 60;
export const DEFAULT_UPDATE_INTERVAL = HOUR / 12;

export const chromeAddressBarHeight = 56;

export const FLOWS = [
  {
    title: 'Новые',
    alias: 'news',
  },
  {
    title: 'Интересные',
    alias: 'rating',
  },
];

export * from './themes';
export * from './localStorage';
export * from './interface';
export { default as DEFAULT_USER_SETTINGS } from './user';
