import expect from 'expect';
import reducer, { LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../user';

describe('user', () => {
  describe('reducer', () => {
    const initialState = {
      original: true
    };

    it('should return original state', () => {
      expect(reducer(initialState, {}))
        .toBe(initialState);
    });

    it('should return loading state', () => {
      expect(reducer(initialState, {
        type: LOAD
      }))
        .toEqual({
          original: true,
          loading: true
        })
        .toNotBe(initialState);
    });

    it('should return success state', () => {
      expect(reducer(initialState, {
        type: LOAD_SUCCESS,
        response: {
          entities: {
            users: {
              gaearon: {name: 'name'}
            }
          },
          result: 'gaearon'
        }
      }))
        .toEqual({
          original: true,
          loading: false,
          loaded: true,
          error: false,
          name: 'name'
        })
        .toNotBe(initialState);
    });

    it('should return failure state', () => {
      expect(reducer(initialState, {
        type: LOAD_FAIL,
        error: 'error'
      }))
        .toEqual({
          original: true,
          loading: false,
          loaded: false,
          error: 'error',
          name: null
        })
        .toNotBe(initialState);
    });
  });
});
