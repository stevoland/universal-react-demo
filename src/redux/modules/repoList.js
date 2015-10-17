import { CALL_API, Schemas } from '../middleware/apiMiddleware';

export const LOAD = 'repoList/LOAD';
export const LOAD_SUCCESS = 'repoList/LOAD_SUCCESS';
export const LOAD_FAIL = 'repoList/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        items: action.response.result.map((id) => action.response.entities.repos[id])
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        items: []
      };
    default:
      return state;
  }
}

export function isLoaded(globalState, username) {
  return globalState.repoList && globalState.repoList.loaded && (globalState.user.id === username);
}

export function load(username) {
  return {
    type: LOAD,
    [CALL_API]: {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      endpoint: `users/${username}/repos?sort=updated`,
      schema: Schemas.REPO_ARRAY
    }
  };
}
