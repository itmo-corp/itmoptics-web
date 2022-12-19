import axios from 'axios';

export const API_URL = process.env.REACT_APP_ITMOPTICS_API;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

export default instance;
