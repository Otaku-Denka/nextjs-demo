import {
  FETCHING_REPO_BASIC_REQUEST,
  FETCHING_REPO_BASIC_SUCCESS,
  FETCHING_REPO_BASIC_FAILURE,
  FETCHING_REPO_README_REQUEST,
  FETCHING_REPO_README_SUCCESS,
  FETCHING_REPO_README_FAILURE,
} from '../actions/constants';
import { RepoItem, RepoReadme } from '../types/repos';

export interface DetailState {
  repoBasic: RepoItem;
  readme: RepoReadme;
  isFetching: boolean;
  err: any;
}

export interface FetchingRepoBasicRequest {
  type: typeof FETCHING_REPO_BASIC_REQUEST;
}

export interface FetchingRepoBasicSuccess {
  type: typeof FETCHING_REPO_BASIC_SUCCESS;
  payload: any;
}

export interface FetchingRepoBasicFailure {
  type: typeof FETCHING_REPO_BASIC_FAILURE;
  err: any;
}

export interface FetchingRepoReadmeRequest {
  type: typeof FETCHING_REPO_README_REQUEST;
}

export interface FetchingRepoReadmeSuccess {
  type: typeof FETCHING_REPO_README_SUCCESS;
  payload: any;
}

export interface FetchingRepoReadmeFailure {
  type: typeof FETCHING_REPO_README_FAILURE;
  err: any;
}

export type DetailActions =
  | FetchingRepoBasicRequest
  | FetchingRepoBasicSuccess
  | FetchingRepoBasicFailure
  | FetchingRepoReadmeRequest
  | FetchingRepoReadmeSuccess
  | FetchingRepoReadmeFailure;
