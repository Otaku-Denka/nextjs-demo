import { SearchState, SearchActions } from '../types/search';
import {
  SEARCHING_REPOS_FAILURE,
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
  SEARCH_USERS_BY_NAME_REQUEST,
  SEARCH_USERS_BY_NAME_SUCCESS,
  SEARCH_USERS_BY_NAME_FAILURE,
} from '../actions/constants';

export const searchInitialState: SearchState = {
  repos: {
    total_count: 0,
    items: [],
    fetchId: 0,
  },
  users: {
    total_count: 0,
    items: [],
    fetchId: 0,
  },
  isFetching: false,
  err: '',
};

export default function search(
  state: SearchState = searchInitialState,
  action: SearchActions,
): SearchState {
  switch (action.type) {
    case SEARCHING_REPOS_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        repos: {
          ...searchInitialState.repos,
          total_count: 0,
          items: [],
          fetchId: action.fetchId,
        },
      };
    case SEARCHING_REPOS_SUCCESS:
      if (action.fetchId === state.repos.fetchId) {
        return {
          ...state,
          isFetching: false,
          err: '',
          repos: { ...action.payload },
        };
      }

      return {
        ...state,
      };

    case SEARCHING_REPOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        repos: {
          ...searchInitialState.repos,
          total_count: 0,
          items: [],
          fetchId: state.repos.fetchId,
        },
        err: action.err.message,
      };
    case SEARCH_USERS_BY_NAME_REQUEST:
      return {
        ...state,
        isFetching: true,
        err: '',
        users: {
          ...searchInitialState.users,
          total_count: 0,
          items: [],
          fetchId: action.fetchId,
        },
      };
    case SEARCH_USERS_BY_NAME_SUCCESS:
      if (action.fetchId === state.users.fetchId) {
        return {
          ...state,
          isFetching: false,
          err: '',
          users: { ...action.payload },
        };
      }
      return {
        ...state,
      };
    case SEARCH_USERS_BY_NAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err,
        users: { ...searchInitialState.users, total_count: 0, items: [] },
      };
    default:
      return state;
  }
}
