import {
  FETCHING_REPO_BASIC_REQUEST,
  FETCHING_REPO_BASIC_SUCCESS,
  FETCHING_REPO_BASIC_FAILURE,
} from './constants';

import {
  FetchingRepoBasicFailure,
  FetchingRepoBasicSuccess,
  FetchingRepoBasicRequest,
} from '../types/detail';
import axios from 'axios';
import { Dispatch } from 'redux';
import getCofnig from 'next/config';
const { publicRuntimeConfig } = getCofnig();
const { GITHUB_API_URL } = publicRuntimeConfig;

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

export function fetchingRepoBasic(queryString: string, cb?: any): any {
  return async (dispatch: Dispatch, getState: any): Promise<any> => {
    try {
      const store = getState();
      const { user } = store;
      const { token_type, access_token } = user.data;
      const headers = {
        Authorization: `${token_type} ${access_token}`,
      };
      dispatch(fetchingRepoBasicRequest());
      const userRepos = await axios.get(`${GITHUB_API_URL}${queryString}`, {
        headers,
      });
      if (userRepos.status === 200) {
        dispatch(fetchingRepoBasicSuccess(userRepos.data));
      } else {
        dispatch(fetchingRepoBasicFailure(userRepos));
      }
      if (cb) {
        cb(userRepos);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(fetchingRepoBasicFailure(e));
    }
  };
}
