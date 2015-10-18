import { CALL_API, Schemas } from '../middleware/apiMiddleware';

export const LOAD = 'repo/LOAD';
export const LOAD_SUCCESS = 'repo/LOAD_SUCCESS';
export const LOAD_FAIL = 'repo/LOAD_FAIL';

const initialState = {
  loaded: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState, name, requiredFields = []) {
  if (!globalState.entities || !globalState.entities.repos) {
    return false;
  }

  const repo = globalState.entities.repos[name];

  if (!repo || !requiredFields.every(key => repo.hasOwnProperty(key))) {
    return false;
  }

  return true;
}

export function load(name) {
  return {
    type: LOAD,
    [CALL_API]: {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      endpoint: `repos/${name}`,
      schema: Schemas.REPO
    }
  };
}
