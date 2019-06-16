import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import common, { commonInitialState, CommonState } from './reducers/common';
import user, { userInitialState } from './reducers/user';
import { Userstate } from './types/user';

export interface ReducersState {
  common: CommonState;
  user: Userstate;
}

const reducers = combineReducers({
  common,
  user,
});

const initialState: ReducersState = {
  common: commonInitialState,
  user: userInitialState,
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
