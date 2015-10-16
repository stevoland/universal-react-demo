import expect from 'expect';
import apiMiddleware, { CALL_API, Schemas } from '../apiMiddleware';

const mockRepo = require('./mockRepo');

const dispatch = (action) => {
  const store = {
    getState() {
      return {};
    }
  };
  const disp = apiMiddleware(store)(actionAttempt => actionAttempt);

  return disp(action);
};

describe('apiMiddleware', () => {
  it('should throw without string endpoint', () => {
    const action = {
      [CALL_API]: {}
    };

    expect(dispatch)
      .withArgs(action)
      .toThrow('Specify a string endpoint URL.');
  });

  it('should throw without a schema', () => {
    const action = {
      [CALL_API]: {
        endpoint: 'path'
      }
    };

    expect(dispatch)
      .withArgs(action)
      .toThrow('Specify one of the exported Schemas.');
  });

  it('should throw without a types array', () => {
    const action = {
      [CALL_API]: {
        endpoint: 'path',
        schema: Schemas.REPO
      }
    };

    expect(dispatch)
      .withArgs(action)
      .toThrow('Expected an array of three action types.');
  });

  it('should throw without a correct types array', () => {
    const action = {
      [CALL_API]: {
        endpoint: 'path',
        schema: Schemas.REPO,
        types: [null, null, null]
      }
    };

    expect(dispatch)
      .withArgs(action)
      .toThrow('Expected action types to be strings.');
  });

  describe('fetching', () => {
    const action = {
      [CALL_API]: {
        endpoint: 'path',
        schema: Schemas.REPO,
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
      }
    };

    it('should request endpoint', () => {
      global.fetch = expect.createSpy().andCall(() => {
        return new Promise(() => {});
      });

      dispatch(action);

      expect(global.fetch)
        .toHaveBeenCalledWith('https://api.github.com/path');
    });

    it('should handle failure', (done) => {
      global.fetch = expect.createSpy().andReturn(
        new Promise((resolve) => {
          resolve({
            ok: false,
            json: () => {
              return new Promise((res) => {
                res({});
              });
            }
          });
        })
      );

      dispatch(action).then((dispatched) => {
        expect(dispatched).toEqual({
          error: 'Something bad happened',
          type: 'FAILURE'
        });
        done();
      });
    });

    it('should handle success for Repo schema', (done) => {
      global.fetch = expect.createSpy().andReturn(
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => {
              return new Promise((res) => {
                res(mockRepo);
              });
            }
          });
        })
      );

      dispatch(action).then((dispatched) => {
        expect(dispatched).toEqual({
          response: {
            entities: {
              repos: {
                'facebook/react': {
                  fullName: 'facebook/react',
                  id: 10270250,
                  name: 'react',
                  owner: 'facebook',
                  private: false
                }
              },
              users: {
                facebook: {
                  avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=3',
                  id: 69631,
                  login: 'facebook'
                }
              }
            },
            result: 'facebook/react'
          },
          type: 'SUCCESS'
        });
        done();
      });
    });

    // @todo
    xit('should handle success for Repo array schema', () => {

    });

    xit('should handle success for User schema', () => {

    });

    xit('should handle success for User array schema', () => {

    });
  });

});
