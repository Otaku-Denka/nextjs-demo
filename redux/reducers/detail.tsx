import { DetailActions, DetailState } from '../types/detail';
import {
  FETCHING_REPO_BASIC_REQUEST,
  FETCHING_REPO_BASIC_SUCCESS,
  FETCHING_REPO_BASIC_FAILURE,
  FETCHING_REPO_README_REQUEST,
  FETCHING_REPO_README_SUCCESS,
  FETCHING_REPO_README_FAILURE,
  FETCHING_REPO_ISSUES_REQUEST,
  FETCHING_REPO_ISSUES_SUCCESS,
  FETCHING_REPO_ISSUES_FAILURE,
  FETCHING_REPO_LABELS_REQUEST,
  FETCHING_REPO_LABELS_SUCCESS,
  FETCHING_REPO_LABELS_FAILURE,
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
  issues: [],
  labels: {
    full_name: '',
    items: [],
  },

  readme: {
    full_name: '',
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
    case FETCHING_REPO_README_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        readme: detailInitialState.readme,
      };
    case FETCHING_REPO_README_SUCCESS:
      return {
        ...state,
        isFetching: false,
        err: '',
        readme: action.payload,
      };
    case FETCHING_REPO_README_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        readme: detailInitialState.readme,
      };
    case FETCHING_REPO_ISSUES_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        issues: [],
      };
    case FETCHING_REPO_ISSUES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        err: '',
        issues: action.payload,
      };
    case FETCHING_REPO_ISSUES_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        issues: [],
      };
    case FETCHING_REPO_LABELS_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        labels: {
          full_name: '',
          items: [],
        },
      };
    case FETCHING_REPO_LABELS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        err: '',
        labels: action.payload,
      };
    case FETCHING_REPO_LABELS_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        labels: {
          full_name: '',
          items: [],
        },
      };

    default:
      return state;
  }
}
