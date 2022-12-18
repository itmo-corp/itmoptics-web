import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk);
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(thunk, createLogger());
};

const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));

export default store;
