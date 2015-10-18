export default function popularityComparator(first, second) {
  if (first.stargazersCount > second.stargazersCount) {
    return -1;
  }

  if (second.stargazersCount > first.stargazersCount) {
    return 1;
  }

  if (first.forksCount > second.forksCount) {
    return -1;
  }

  if (second.forksCount > first.forksCount) {
    return 1;
  }

  return 0;
}
