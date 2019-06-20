import { ReducersState } from '../../store';
import { RepoItem } from '../../types/repos';
import { createSelector } from 'reselect';

const getIsFetching = (state: ReducersState): boolean => state.repos.isFetching;

const getUserRepos = (state: ReducersState): RepoItem[] =>
  state.repos.userRepos;

const getStaredRepos = (state: ReducersState): RepoItem[] =>
  state.repos.staredRepos;

export const getUserReposSelector = createSelector(
  [getUserRepos],
  (repos: RepoItem[]) => repos,
);

export const getStaredReposSelector = createSelector(
  [getStaredRepos],
  (repos: RepoItem[]) => repos,
);

export const getReposIsFetchingSelector = createSelector(
  [getIsFetching],
  (isFetching: boolean) => isFetching,
);
