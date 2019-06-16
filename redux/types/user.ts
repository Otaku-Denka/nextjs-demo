import { LOGOUT } from '../actions/constants';

export interface Userstate {
  avatar_url: string;
  id: number | string;
  login: string;
  name?: string;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LogoutSuccessAction;
