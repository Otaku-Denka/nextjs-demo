import {
  SEARCHING_REPOS_FAILURE,
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
} from './constants';
import { Dispatch } from 'redux';
import getCofnig from 'next/config';
import {
  SearchReposRequest,
  SearchReposSuccess,
  SearchReposFailure,
} from '../types/search';
import axios from 'axios';

const { publicRuntimeConfig } = getCofnig();
const { GITHUB_API_URL } = publicRuntimeConfig;

function searchingReposRequest(): SearchReposRequest {
  return {
    type: SEARCHING_REPOS_REQUEST,
  };
}

function searchingReposSuccess(payload: any): SearchReposSuccess {
  return {
    payload,
    type: SEARCHING_REPOS_SUCCESS,
  };
}

function searchingReposFailure(err: any): SearchReposFailure {
  return {
    err,
    type: SEARCHING_REPOS_FAILURE,
  };
}

export function searchingRepos(qs: string = '', cb?: any): any {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch(searchingReposRequest());
      const userRepos = await axios.get(
        `${GITHUB_API_URL}/search/repositories${qs}`,
      );
      if (userRepos.status === 200) {
        dispatch(searchingReposSuccess(userRepos.data));
      } else {
        dispatch(searchingReposFailure(userRepos));
      }
      if (cb) {
        cb(userRepos);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(searchingReposFailure(e));
    }
  };
}
