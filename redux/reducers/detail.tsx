import { DetailActions, DetailState } from '../types/detail';
import {
  FETCHING_REPO_BASIC_REQUEST,
  FETCHING_REPO_BASIC_SUCCESS,
  FETCHING_REPO_BASIC_FAILURE,
} from '../actions/constants';

export const detailInitialState: DetailState = {
  repoBasic: {
    full_name: '',
    description: '',
    id: '',
    updated_at: '',
    language: '',
    license: {
      key: '',
      name: '',
      spdx_id: '',
      url: '',
      node_id: '',
    },
    name: '',
    node_id: '',
    open_issues: 0,
    open_issues_count: 0,
    owner: {
      login: '',
      id: '',
      node_id: '',
      avatar_url: '',
      gravatar_id: '',
    },
    stargazers_count: 0,
  },
  readme: {
    name: '',
    path: '',
    sha: '',
    size: 0,
    url: '',
    content: '',
    encoding: '',
  },
  isFetching: false,
  err: '',
};

export default function detail(
  state: DetailState = detailInitialState,
  action: DetailActions,
): DetailState {
  switch (action.type) {
    case FETCHING_REPO_BASIC_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        repoBasic: detailInitialState.repoBasic,
      };
    case FETCHING_REPO_BASIC_SUCCESS:
      return {
        ...state,
        isFetching: false,
        err: '',
        repoBasic: action.payload,
      };
    case FETCHING_REPO_BASIC_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        repoBasic: detailInitialState.repoBasic,
      };
    default:
      return state;
  }
}
