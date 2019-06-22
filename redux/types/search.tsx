import { RepoItem } from './repos';
import {
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
  SEARCHING_REPOS_FAILURE,
  SEARCH_USERS_BY_NAME_REQUEST,
  SEARCH_USERS_BY_NAME_SUCCESS,
  SEARCH_USERS_BY_NAME_FAILURE,
} from '../actions/constants';
import { UserItem } from './user';
import { Action } from 'redux';

export interface SearchReposRequest extends Action {
  type: typeof SEARCHING_REPOS_REQUEST;
  fetchId: number | string;
}

export interface SearchReposSuccess extends Action {
  type: typeof SEARCHING_REPOS_SUCCESS;
  payload: any;
  fetchId: number | string;
}

export interface SearchReposFailure extends Action {
  type: typeof SEARCHING_REPOS_FAILURE;
  err: any;
}
export interface SearchUserByNameRequest extends Action {
  type: typeof SEARCH_USERS_BY_NAME_REQUEST;
  fetchId: number | string;
}

export interface SearchUserByNameSuccess extends Action {
  type: typeof SEARCH_USERS_BY_NAME_SUCCESS;
  payload: any;
  fetchId: number | string;
}

export interface SearchUserByNameFailure extends Action {
  type: typeof SEARCH_USERS_BY_NAME_FAILURE;
  err: any;
}

export interface ReposResultState {
  total_count: number;
  items: RepoItem[];
  fetchId?: number | string;
}

export interface UsersResultState {
  total_count: number;
  items: UserItem[];
  fetchId?: number | string;
}

export interface SearchState {
  isFetching: boolean;
  err: any;
  repos: ReposResultState;
  users: UsersResultState;
}

export type SearchActions =
  | SearchReposRequest
  | SearchReposSuccess
  | SearchReposFailure
  | SearchUserByNameRequest
  | SearchUserByNameSuccess
  | SearchUserByNameFailure;
