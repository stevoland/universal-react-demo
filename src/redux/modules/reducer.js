import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import user from './user';

export default combineReducers({
  router: routerStateReducer,
  user
});
