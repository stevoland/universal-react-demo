import expect from 'expect';
import popularityComparator from '../popularityComparator';

describe('popularityComparator', () => {
  it('should sort first by stargazersCount then forksCount', () => {
    const original = [
      {stargazersCount: 10, forksCount: 6},
      {stargazersCount: 10, forksCount: 7},
      {stargazersCount: 11, forksCount: 10},
      {stargazersCount: 20, forksCount: 10}
    ];

    const actual = original.sort(popularityComparator);

    expect(actual)
      .toEqual([
        {stargazersCount: 20, forksCount: 10},
        {stargazersCount: 11, forksCount: 10},
        {stargazersCount: 10, forksCount: 7},
        {stargazersCount: 10, forksCount: 6}
      ]);
  });
});
