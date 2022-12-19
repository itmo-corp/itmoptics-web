import {
  GET_EXHIBIT_LOADING,
  GET_EXHIBIT_SUCCESS,
  GET_EXHIBIT_FAIL,
} from './types';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_EXHIBIT_LOADING:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };
    case GET_EXHIBIT_SUCCESS:
      return {
        ...state,
        data: payload.exhibit,
        fetching: false,
        fetched: true,
        error: null,
      };
    case GET_EXHIBIT_FAIL:
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
