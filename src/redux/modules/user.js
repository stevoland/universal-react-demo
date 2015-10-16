import { CALL_API, Schemas } from '../middleware/apiMiddleware';

export const LOAD = 'user/LOAD';
export const LOAD_SUCCESS = 'user/LOAD_SUCCESS';
export const LOAD_FAIL = 'user/LOAD_FAIL';

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
      const username = action.response.result;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        name: action.response.entities.users[username].name
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        name: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.user && globalState.user.loaded;
}

export function load(username) {
  return {
    type: LOAD,
    [CALL_API]: {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      endpoint: `users/${username}`,
      schema: Schemas.USER
    }
  };
}
