import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import expect from 'expect';

import { Link } from 'react-router';

import { PlainHome as Home, styles } from '../Home';
import { Stats } from '../../../components';

describe('Home', () => {
  let renderer;
  beforeEach(() => {
    renderer = createRenderer();
  });


  it('should handle failure state', () => {
    renderer.render(
      <Home repoList={{
        loading: false,
        loaded: false,
        error: 'error',
        items: []
      }} />
    );

    expect(renderer.getRenderOutput().props.children)
      .toEqual(
        <p>There was a problem</p>
      );
  });

  it('should show list of repos', () => {
    renderer.render(
      <Home repoList={{
        loading: false,
        loaded: true,
        items: [
          {
            name: 'repo1',
            fullName: 'user/repo1',
            stargazersCount: 1,
            watchersCount: 2,
            forksCount: 3
          },
          {
            name: 'repo2',
            fullName: 'user/repo2',
            stargazersCount: 4,
            watchersCount: 5,
            forksCount: 6
          }
        ]
      }} />
    );

    expect(renderer.getRenderOutput().props.children)
      .toEqual(
        <ul className={styles.List}>
          <li className={styles.Item} key={0}>
            <Link to="/repos/user/repo2">repo2</Link>
            <Stats className={styles.Stats} stars={4} watchers={5} forks={6} />
          </li>
          <li className={styles.Item} key={1}>
            <Link to="/repos/user/repo1">repo1</Link>
            <Stats className={styles.Stats} stars={1} watchers={2} forks={3} />
          </li>
        </ul>
      );
  });
});
