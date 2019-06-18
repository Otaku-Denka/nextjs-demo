import { Userstate, UserActionTypes } from '../types/user';
import { LOGOUT } from '../actions/constants';

export const userInitialState: Userstate = {
  data: {
    avatar_url: '',
    id: '',
    login: '',
    name: '',
    bio: '',
    email: '',
    access_token: '',
    token_type: '',
  },
};

export default function user(
  state: Userstate = userInitialState,
  action: UserActionTypes,
): Userstate {
  switch (action.type) {
    case LOGOUT:
      return { ...state, data: { ...userInitialState.data } };
    default:
      return state;
  }
}
