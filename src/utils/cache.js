import { DEFAULT_UPDATE_INTERVAL } from 'config/constants';

export const parse = data => {
  if (!data) return false;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Cannot parse object:', e, '\nGot:', data);
    return false;
  }
};

export const shouldUpdate = storeData => {
  const now = Date.now();
  const shouldUpdateByTS = d => now - d >= DEFAULT_UPDATE_INTERVAL;

  if (storeData) {
    return shouldUpdateByTS(storeData.lastUpdated);
  }
  return true;
};
