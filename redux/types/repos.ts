import {
  FETCHING_USER_REPOS_REQUEST,
  FETCHING_USER_REPOS_SUCCESS,
  FETCHING_USER_REPOS_FAILURE,
  FETCHING_STARED_REPOS_REQUEST,
  FETCHING_STARED_REPOS_SUCCESS,
  FETCHING_STARED_REPOS_FAILURE,
} from '../actions/constants';

export interface FetchingUserRepoRequest {
  type: typeof FETCHING_USER_REPOS_REQUEST;
}

export interface FetchingUserRepoSuccess {
  type: typeof FETCHING_USER_REPOS_SUCCESS;
  payload: any;
}

export interface FetchingUserRepoFailure {
  type: typeof FETCHING_USER_REPOS_FAILURE;
  err: any;
}

export interface FetchingStaredRepoRequest {
  type: typeof FETCHING_STARED_REPOS_REQUEST;
}

export interface FetchingStaredRepoSuccess {
  type: typeof FETCHING_STARED_REPOS_SUCCESS;
  payload: any;
}

export interface FetchingStaredRepoFailure {
  type: typeof FETCHING_STARED_REPOS_FAILURE;
  err: any;
}

export interface RepoItem {
  full_name: string;
  description?: string;
  id: string | number;
  updated_at: string;
  language: string;
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string | number;
  };
  name: string;
  node_id: string;
  open_issues: number;
  open_issues_count: number;
  owner: {
    login: string;
    id: number | string;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
  };
  stargazers_count: number;
}

export interface RepoState {
  isFetching: boolean;
  userRepos: RepoItem[];
  staredRepos: RepoItem[];
  err: any;
}

export type ReposActions =
  | FetchingUserRepoRequest
  | FetchingUserRepoSuccess
  | FetchingUserRepoFailure
  | FetchingStaredRepoRequest
  | FetchingStaredRepoSuccess
  | FetchingStaredRepoFailure;
