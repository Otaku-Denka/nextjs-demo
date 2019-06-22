import {
  SEARCHING_REPOS_FAILURE,
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
  SEARCH_USERS_BY_NAME_REQUEST,
  SEARCH_USERS_BY_NAME_SUCCESS,
  SEARCH_USERS_BY_NAME_FAILURE,
} from './constants';
import { Dispatch } from 'redux';
import getCofnig from 'next/config';
import {
  SearchReposRequest,
  SearchReposSuccess,
  SearchReposFailure,
  SearchUserByNameRequest,
  SearchUserByNameSuccess,
  SearchUserByNameFailure,
} from '../types/search';
import axios from 'axios';

const { publicRuntimeConfig } = getCofnig();
const { GITHUB_API_URL } = publicRuntimeConfig;
function searchingUserByNameRequest(
  fetchId: number | string,
): SearchUserByNameRequest {
  return {
    fetchId,
    type: SEARCH_USERS_BY_NAME_REQUEST,
  };
}

function searchingUserByNameSuccess(
  payload: any,
  fetchId: number | string,
): SearchUserByNameSuccess {
  return {
    fetchId,
    payload,
    type: SEARCH_USERS_BY_NAME_SUCCESS,
  };
}

function searchingUserByNameFailure(err: any): SearchUserByNameFailure {
  return {
    err,
    type: SEARCH_USERS_BY_NAME_FAILURE,
  };
}

export function searchUsers(
  qs: string = '',
  fetchId: number = 0,
  cb?: any,
): any {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch(searchingUserByNameRequest(fetchId));
      const searchResult = await axios.get(
        `${GITHUB_API_URL}/search/users${qs}`,
      );
      if (searchResult.status === 200) {
        const data = {
          ...searchResult.data,
          fetchId,
        };
        dispatch(searchingUserByNameSuccess(data, fetchId));
      } else {
        dispatch(searchingUserByNameFailure(searchResult));
      }
      if (cb) {
        cb(searchResult);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(searchingUserByNameFailure(e));
    }
  };
}

function searchingReposRequest(fetchId: string | number): SearchReposRequest {
  return {
    fetchId,
    type: SEARCHING_REPOS_REQUEST,
  };
}

function searchingReposSuccess(
  payload: any,
  fetchId: string | number,
): SearchReposSuccess {
  return {
    fetchId,
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

export function searchingRepos(
  qs: string = '',
  fetchId: number = 0,
  cb?: any,
): any {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch(searchingReposRequest(fetchId));
      const searchResult = await axios.get(
        `${GITHUB_API_URL}/search/repositories${qs}`,
      );
      if (searchResult.status === 200) {
        const data = {
          ...searchResult.data,
          fetchId,
        };
        dispatch(searchingReposSuccess(data, fetchId));
      } else {
        dispatch(searchingReposFailure(searchResult));
      }
      if (cb) {
        cb(searchResult);
      }
    } catch (e) {
      if (cb) {
        cb(e);
      }
      dispatch(searchingReposFailure(e));
    }
  };
}
