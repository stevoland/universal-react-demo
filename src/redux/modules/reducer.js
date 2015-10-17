import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import entities from './entities';
import user from './user';
import repoList from './repoList';

export default combineReducers({
  router: routerStateReducer,
  entities,
  user,
  repoList
});
