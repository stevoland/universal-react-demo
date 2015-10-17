import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import entities from './entities';
import user from './user';
import repoList from './repoList';
import repo from './repo';

export default combineReducers({
  router: routerStateReducer,
  entities,
  user,
  repoList,
  repo
});
