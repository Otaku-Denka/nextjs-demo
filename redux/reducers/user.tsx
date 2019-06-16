import { Userstate, UserActionTypes } from '../types/user';
import { LOGOUT } from '../actions/constants';

export const userInitialState: Userstate = {
  avatar_url: '',
  id: '',
  login: '',
  name: '',
};

export default function user(
  state: Userstate = userInitialState,
  action: UserActionTypes,
) {
  switch (action.type) {
    case LOGOUT:
      return { ...userInitialState };
    default:
      return state;
  }
}
