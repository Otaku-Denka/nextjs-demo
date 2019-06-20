import { SearchState, SearchActions } from '../types/search';
import {
  SEARCHING_REPOS_FAILURE,
  SEARCHING_REPOS_REQUEST,
  SEARCHING_REPOS_SUCCESS,
} from '../actions/constants';

export const searchInitialState: SearchState = {
  total_count: 0,
  isFetching: false,
  items: [],
  err: '',
};

export default function search(
  state: SearchState = searchInitialState,
  action: SearchActions,
): SearchState {
  switch (action.type) {
    case SEARCHING_REPOS_REQUEST:
      return { ...state, isFetching: true, total_count: 0, items: [], err: '' };
    case SEARCHING_REPOS_SUCCESS:
      return { ...state, isFetching: false, err: '', ...action.payload };
    case SEARCHING_REPOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        total_count: 0,
        items: [],
        err: action.err,
      };
    default:
      return state;
  }
}
