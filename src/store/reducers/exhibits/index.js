import {
  GET_EXHIBITS_LOADING,
  GET_EXHIBITS_SUCCESS,
  GET_EXHIBITS_FAIL,
} from './types';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  exhibits: [],
  lastUpdated: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_EXHIBITS_LOADING:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };
    case GET_EXHIBITS_SUCCESS:
      return {
        ...state,
        exhibits: payload.exhibits,
        lastUpdated: Date.now(),
        fetching: false,
        fetched: true,
        error: null,
      };
    case GET_EXHIBITS_FAIL:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
