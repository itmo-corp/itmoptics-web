import ExhibitsService from 'services/api/ExhibitsService';
import { shouldUpdate } from 'utils/cache';

import {
  GET_EXHIBITS_LOADING,
  GET_EXHIBITS_SUCCESS,
  GET_EXHIBITS_FAIL,
} from 'store/reducers/exhibits/types';

const getExhibits =
  (forceUpdate = false) => (dispatch, getState) => {
    const storeState = getState();
    const storeData = storeState.exhibits;

    if (!shouldUpdate(storeData) && !forceUpdate) {
      return Promise.resolve();
    }

    dispatch({ type: GET_EXHIBITS_LOADING });

    return ExhibitsService.getAll().then(
      response => {
        dispatch({
          type: GET_EXHIBITS_SUCCESS,
          payload: { exhibits: response.data },
        });
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: GET_EXHIBITS_FAIL,
          payload: { error: error?.response?.data?.errors },
        });
        return Promise.reject();
      }
    );
  };

export default getExhibits;
