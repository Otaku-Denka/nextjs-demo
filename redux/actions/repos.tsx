import {
  FETCHING_USER_REPOS_REQUEST,
  FETCHING_USER_REPOS_SUCCESS,
  FETCHING_USER_REPOS_FAILURE,
  FETCHING_STARED_REPOS_SUCCESS,
  FETCHING_STARED_REPOS_REQUEST,
  FETCHING_STARED_REPOS_FAILURE,
} from './constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import getCofnig from 'next/config';
const { publicRuntimeConfig } = getCofnig();
const { GITHUB_API_URL } = publicRuntimeConfig;
import {
  FetchingUserRepoRequest,
  FetchingUserRepoSuccess,
  FetchingUserRepoFailure,
  FetchingStaredRepoRequest,
  FetchingStaredRepoSuccess,
  FetchingStaredRepoFailure,
} from '../types/repos';

function fetchingStaredRepoRequest(): FetchingStaredRepoRequest {
  return {
    type: FETCHING_STARED_REPOS_REQUEST,
  };
}

function fetchingStaredRepoSuccess(payload: any): FetchingStaredRepoSuccess {
  return {
    payload,
    type: FETCHING_STARED_REPOS_SUCCESS,
  };
}

function fetchingStaredRepoFailure(err: any): FetchingStaredRepoFailure {
  return {
    err,
    type: FETCHING_STARED_REPOS_FAILURE,
  };
}

export function fetchingStaredRepo(cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingStaredRepoRequest());
      const userRepos = await axios.get(`${GITHUB_API_URL}/user/starred`, {
        headers,
      });
      if (userRepos.status === 200) {
        dispatch(fetchingStaredRepoSuccess(userRepos.data));
      } else {
        dispatch(fetchingStaredRepoFailure(userRepos));
      }
      if (cb) {
        cb(userRepos);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingStaredRepoFailure(e));
    }
  };
}

function fetchingUserRepoRequest(): FetchingUserRepoRequest {
  return {
    type: FETCHING_USER_REPOS_REQUEST,
  };
}

function fetchingUserRepoSuccess(payload: any): FetchingUserRepoSuccess {
  return {
    payload,
    type: FETCHING_USER_REPOS_SUCCESS,
  };
}

function fetchingUserRepoFailure(err: any): FetchingUserRepoFailure {
  return {
    err,
    type: FETCHING_USER_REPOS_FAILURE,
  };
}

export function fetchingUserRepo(cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingUserRepoRequest());
      const userRepos = await axios.get(`${GITHUB_API_URL}/user/repos`, {
        headers,
      });
      if (userRepos.status === 200) {
        dispatch(fetchingUserRepoSuccess(userRepos.data));
      } else {
        dispatch(fetchingUserRepoFailure(userRepos));
      }
      if (cb) {
        cb(userRepos);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingUserRepoFailure(e));
    }
  };
}
