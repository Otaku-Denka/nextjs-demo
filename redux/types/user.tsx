import { LOGOUT } from '../actions/constants';

export interface UserItem {
  avatar_url: string;
  id: number | string;
  login: string;
  name?: string;
  bio?: string;
  email: string;
  token_type: string;
  access_token: string;
}

export interface Userstate {
  data: UserItem;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LogoutSuccessAction;
