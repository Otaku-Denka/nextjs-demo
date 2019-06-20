import { RepoItem } from './repos';
import {
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
  SEARCHING_REPOS_FAILURE,
} from '../actions/constants';

export interface SearchReposRequest {
  type: typeof SEARCHING_REPOS_REQUEST;
}

export interface SearchReposSuccess {
  type: typeof SEARCHING_REPOS_SUCCESS;
  payload: any;
}

export interface SearchReposFailure {
  type: typeof SEARCHING_REPOS_FAILURE;
  err: any;
}

export interface SearchState {
  total_count: number;
  isFetching: boolean;
  items: RepoItem[];
  err: any;
}

export type SearchActions =
  | SearchReposRequest
  | SearchReposSuccess
  | SearchReposFailure;
