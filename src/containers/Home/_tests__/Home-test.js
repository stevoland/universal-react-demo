import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import expect from 'expect';

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
          {name: 'repo1'},
          {name: 'repo2'}
        ]
      }} />
    );

    expect(renderer.getRenderOutput().props.children)
      .toEqual(
        <ul>
          <li key={0}>repo1</li>
          <li key={1}>repo2</li>
        </ul>
      );
  });
});
