import { SET_SETTINGS, GET_SETTINGS } from 'store/reducers/settings/types';

export const setSettings = payload => dispatch => dispatch({ type: SET_SETTINGS, payload });

export const getSettings = () => dispatch => dispatch({ type: GET_SETTINGS });
