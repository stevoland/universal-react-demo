import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import expect from 'expect';

import { Link } from 'react-router';

import { PlainHome as Home } from '../Home';

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
          {name: 'repo1', fullName: 'user/repo1'},
          {name: 'repo2', fullName: 'user/repo2'}
        ]
      }} />
    );

    expect(renderer.getRenderOutput().props.children)
      .toEqual(
        <ul>
          <li key={0}><Link to="/repos/user/repo1">repo1</Link></li>
          <li key={1}><Link to="/repos/user/repo2">repo2</Link></li>
        </ul>
      );
  });
});
