import {
  FETCHING_STARED_REPOS_FAILURE,
  FETCHING_STARED_REPOS_REQUEST,
  FETCHING_STARED_REPOS_SUCCESS,
  FETCHING_USER_REPOS_FAILURE,
  FETCHING_USER_REPOS_REQUEST,
  FETCHING_USER_REPOS_SUCCESS,
} from '../actions/constants';

import { ReposActions, RepoState } from '../types/repos';
export const reposInitialState: RepoState = {
  isFetching: false,
  userRepos: [],
  staredRepos: [],
  err: '',
};

export default function user(
  state: RepoState = reposInitialState,
  action: ReposActions,
): RepoState {
  switch (action.type) {
    case FETCHING_USER_REPOS_REQUEST:
      return { ...state, isFetching: true, userRepos: [], err: '' };
    case FETCHING_USER_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userRepos: action.payload,
        err: '',
      };
    case FETCHING_USER_REPOS_FAILURE:
      return { ...state, isFetching: false, userRepos: [], err: action.err };
    case FETCHING_STARED_REPOS_REQUEST:
      return { ...state, isFetching: true, staredRepos: [], err: '' };
    case FETCHING_STARED_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        staredRepos: action.payload,
        err: '',
      };
    case FETCHING_STARED_REPOS_FAILURE:
      return { ...state, isFetching: false, staredRepos: [], err: action.err };
    default:
      return state;
  }
}
