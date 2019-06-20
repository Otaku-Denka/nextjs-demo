import {
  FETCHING_REPO_BASIC_REQUEST,
  FETCHING_REPO_BASIC_SUCCESS,
  FETCHING_REPO_BASIC_FAILURE,
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

export type DetailActions =
  | FetchingRepoBasicRequest
  | FetchingRepoBasicSuccess
  | FetchingRepoBasicFailure;
