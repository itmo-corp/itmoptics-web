import ExhibitsService from 'services/api/ExhibitsService';

import {
  GET_EXHIBIT_LOADING,
  GET_EXHIBIT_SUCCESS,
  GET_EXHIBIT_FAIL,
} from 'store/reducers/exhibit/types';

// eslint-disable-next-line no-unused-vars
const getExhibit = id => (dispatch, getState) => {
  dispatch({ type: GET_EXHIBIT_LOADING });

  const storeState = getState();
  const exhibits = storeState.exhibits.exhibits;
  const exhibit = exhibits.find(elem => elem.id === id);

  if (exhibit) {
    dispatch({
      type: GET_EXHIBIT_SUCCESS,
      payload: { exhibit },
    });
    return Promise.resolve();
  }

  return ExhibitsService.getById(id).then(
    response => {
      dispatch({
        type: GET_EXHIBIT_SUCCESS,
        payload: { exhibit: response.data },
      });
      return Promise.resolve();
    },
    error => {
      dispatch({
        type: GET_EXHIBIT_FAIL,
        payload: { error: error?.response?.statusText },
      });
      return Promise.reject();
    }
  );
};

export default getExhibit;
