import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import common, { commonInitialState, CommonState } from './reducers/common';
import user, { userInitialState } from './reducers/user';
import { Userstate } from './types/user';
import repos, { reposInitialState } from './reducers/repos';
import { RepoState } from './types/repos';
import search, { searchInitialState } from './reducers/search';
import { SearchState } from './types/search';
import detail, { detailInitialState } from './reducers/detail';
import { DetailState } from './types/detail';

export interface ReducersState {
  common: CommonState;
  user: Userstate;
  repos: RepoState;
  search: SearchState;
  detail: DetailState;
}

const reducers = combineReducers({
  common,
  user,
  repos,
  search,
  detail,
});

const initialState: ReducersState = {
  common: commonInitialState,
  user: userInitialState,
  repos: reposInitialState,
  search: searchInitialState,
  detail: detailInitialState,
};

export const initStore = (state: ReducersState = initialState) => {
  return createStore(
    reducers,
    state,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunkMiddleware)
      : composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
};
