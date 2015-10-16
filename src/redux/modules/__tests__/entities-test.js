import expect from 'expect';
import entities from '../entities';

describe('entities', () => {
  it('should not create new state without a response action', () => {
    const state = {
      users: {},
      repos: {}
    };

    expect(entities(state, {}))
      .toBe(state);
  });

  it('should create new state with a response action', () => {
    const state = {
      users: {
        'user1': true,
        'user2': true
      },
      repos: []
    };

    expect(entities(state, {
      response: {
        entities: {
          users: {
            'user3': true
          }
        }
      }
    }))
      .toNotBe(state)
      .toEqual({
        users: {
          'user1': true,
          'user2': true,
          'user3': true
        },
        repos: {}
      });
  });
});
