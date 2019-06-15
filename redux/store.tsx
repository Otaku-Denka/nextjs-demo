import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import common, { commonInitialState } from './reducers/common';
import user, { userInitialState } from './reducers/user';
const reducers = combineReducers({
  common,
  user,
});

const initialState = {
  common: commonInitialState,
  user: userInitialState,
};

export const initStore = (state = initialState) => {
  return createStore(
    reducers,
    state,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunkMiddleware)
      : composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
};
