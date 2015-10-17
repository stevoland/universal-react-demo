import expect from 'expect';
import reducer, { LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../repoList';

describe('repoList', () => {
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
            repos: {
              repo1: {name: 'name1'},
              repo2: {name: 'name2'}
            }
          },
          result: ['repo1', 'repo2']
        }
      }))
        .toEqual({
          original: true,
          loading: false,
          loaded: true,
          error: false,
          items: [
            {name: 'name1'},
            {name: 'name2'}
          ]
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
          items: []
        })
        .toNotBe(initialState);
    });
  });
});
