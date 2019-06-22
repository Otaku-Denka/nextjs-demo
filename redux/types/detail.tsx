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
import { RepoItem, RepoReadme } from '../types/repos';

export interface DetailState {
  repoBasic: RepoItem;
  readme: RepoReadme;
  isFetching: boolean;
  err: any;
  issues: IssueState[];
  labels: {
    full_name: string;
    items: LabelState[];
  };
}

export interface LabelState {
  id: string | number;
  name: string;
  color: string;
  full_name: string;
}

export interface IssueState {
  id: string | number;
  title: string;
  html_url: string;
  user: {
    login: string;
    id: string | number;

    avatar_url: string;
    type: string;
  };
  labels: LabelState[];
  comments: number;
  created_at: string;
  updated_at: string;
  body: string;
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
export interface FetchingRepoIssuesRequest {
  type: typeof FETCHING_REPO_ISSUES_REQUEST;
}

export interface FetchingRepoIssuesSuccess {
  type: typeof FETCHING_REPO_ISSUES_SUCCESS;
  payload: any;
}

export interface FetchingRepoIssuesFailure {
  type: typeof FETCHING_REPO_ISSUES_FAILURE;
  err: any;
}

export interface FetchingRepoLabelsRequest {
  type: typeof FETCHING_REPO_LABELS_REQUEST;
}

export interface FetchingRepoLabelsSuccess {
  type: typeof FETCHING_REPO_LABELS_SUCCESS;
  payload: any;
}

export interface FetchingRepoLabelsFailure {
  type: typeof FETCHING_REPO_LABELS_FAILURE;
  err: any;
}

export type DetailActions =
  | FetchingRepoBasicRequest
  | FetchingRepoBasicSuccess
  | FetchingRepoBasicFailure
  | FetchingRepoReadmeRequest
  | FetchingRepoReadmeSuccess
  | FetchingRepoReadmeFailure
  | FetchingRepoIssuesRequest
  | FetchingRepoIssuesSuccess
  | FetchingRepoIssuesFailure
  | FetchingRepoLabelsRequest
  | FetchingRepoLabelsSuccess
  | FetchingRepoLabelsFailure;
