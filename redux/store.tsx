import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import common, { commonInitialState, CommonState } from './reducers/common';
import user, { userInitialState } from './reducers/user';
import { Userstate } from './types/user';
import repos, { reposInitialState } from './reducers/repos';
import { RepoState } from './types/repos';

export interface ReducersState {
  common: CommonState;
  user: Userstate;
  repos: RepoState;
}

const reducers = combineReducers({
  common,
  user,
  repos,
});

const initialState: ReducersState = {
  common: commonInitialState,
  user: userInitialState,
  repos: reposInitialState,
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
