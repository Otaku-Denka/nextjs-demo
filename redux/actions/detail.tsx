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
} from './constants';

import {
  FetchingRepoBasicFailure,
  FetchingRepoBasicSuccess,
  FetchingRepoBasicRequest,
  FetchingRepoReadmeRequest,
  FetchingRepoReadmeSuccess,
  FetchingRepoReadmeFailure,
  FetchingRepoIssuesRequest,
  FetchingRepoIssuesSuccess,
  FetchingRepoIssuesFailure,
  FetchingRepoLabelsRequest,
  FetchingRepoLabelsSuccess,
  FetchingRepoLabelsFailure,
} from '../types/detail';
import axios from 'axios';
import { Dispatch } from 'redux';
import getCofnig from 'next/config';
const { publicRuntimeConfig } = getCofnig();
const { GITHUB_API_URL } = publicRuntimeConfig;

interface Fullname {
  owner: string;
  name: string;
}

function fetchingRepoLabelsRequest(): FetchingRepoLabelsRequest {
  return {
    type: FETCHING_REPO_LABELS_REQUEST,
  };
}

function fetchingRepoLabelsSuccess(payload: any): FetchingRepoLabelsSuccess {
  return {
    payload,
    type: FETCHING_REPO_LABELS_SUCCESS,
  };
}

function fetchingRepoLabelsFailure(err: any): FetchingRepoLabelsFailure {
  return {
    err,
    type: FETCHING_REPO_LABELS_FAILURE,
  };
}

export function fetchingRepoLabels(fullname: Fullname, cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingRepoLabelsRequest());
      const { owner, name } = fullname;
      const labels = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${name}/labels`,
        {
          headers,
        },
      );
      if (labels.status === 200) {
        const data = {
          full_name: `${owner}/${name}`,
          items: labels.data,
        };
        dispatch(fetchingRepoLabelsSuccess(data));
      } else {
        dispatch(fetchingRepoLabelsFailure(labels));
      }
      if (cb) {
        cb(labels);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingRepoLabelsFailure(e));
    }
  };
}

function fetchingRepoIssuesRequest(): FetchingRepoIssuesRequest {
  return {
    type: FETCHING_REPO_ISSUES_REQUEST,
  };
}

function fetchingRepoIssuesSuccess(payload: any): FetchingRepoIssuesSuccess {
  return {
    payload,
    type: FETCHING_REPO_ISSUES_SUCCESS,
  };
}

function fetchingRepoIssuesFailure(err: any): FetchingRepoIssuesFailure {
  return {
    err,
    type: FETCHING_REPO_ISSUES_FAILURE,
  };
}

export function fetchingRepoIssues(
  fullname: Fullname,
  query?: string,
  cb?: any,
): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingRepoIssuesRequest());
      const { owner, name } = fullname;
      const qs = query ? query : '';
      const issues = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${name}/issues${qs}`,
        {
          headers,
        },
      );
      if (issues.status === 200) {
        dispatch(fetchingRepoIssuesSuccess(issues.data));
      } else {
        dispatch(fetchingRepoIssuesFailure(issues));
      }
      if (cb) {
        cb(issues);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingRepoIssuesFailure(e));
    }
  };
}

function fetchingRepoBasicRequest(): FetchingRepoBasicRequest {
  return {
    type: FETCHING_REPO_BASIC_REQUEST,
  };
}

function fetchingRepoBasicSuccess(payload: any): FetchingRepoBasicSuccess {
  return {
    payload,
    type: FETCHING_REPO_BASIC_SUCCESS,
  };
}

function fetchingRepoBasicFailure(err: any): FetchingRepoBasicFailure {
  return {
    err,
    type: FETCHING_REPO_BASIC_FAILURE,
  };
}

export function fetchingRepoBasic(fullname: Fullname, cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingRepoBasicRequest());
      const { owner, name } = fullname;
      const repoBasic = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${name}`,
        {
          headers,
        },
      );
      if (repoBasic.status === 200) {
        dispatch(fetchingRepoBasicSuccess(repoBasic.data));
      } else {
        dispatch(fetchingRepoBasicFailure(repoBasic));
      }
      if (cb) {
        cb(repoBasic);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingRepoBasicFailure(e));
    }
  };
}

function fetchingRepoReadmeRequest(): FetchingRepoReadmeRequest {
  return {
    type: FETCHING_REPO_README_REQUEST,
  };
}

function fetchingRepoReadmeSuccess(payload: any): FetchingRepoReadmeSuccess {
  return {
    payload,
    type: FETCHING_REPO_README_SUCCESS,
  };
}

function fetchingRepoReadmeFailure(err: any): FetchingRepoReadmeFailure {
  return {
    err,
    type: FETCHING_REPO_README_FAILURE,
  };
}

export function fetchingRepoReadme(fullname: Fullname, cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { owner, name } = fullname;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingRepoReadmeRequest());
      const readme = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${name}/readme`,
        {
          headers,
        },
      );
      if (readme.status === 200) {
        const data = { ...readme.data, full_name: `${owner}/${name}` };

        dispatch(fetchingRepoReadmeSuccess(data));
      } else {
        dispatch(fetchingRepoReadmeFailure(readme));
      }
      if (cb) {
        cb(readme);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingRepoReadmeFailure(e));
    }
  };
}
