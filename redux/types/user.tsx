import { LOGOUT } from '../actions/constants';

export interface Userstate {
  data: {
    avatar_url: string;
    id: number | string;
    login: string;
    name?: string;
    bio?: string;
    email: string;
    token_type: string;
    access_token: string;
  };
}

interface LogoutSuccessAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LogoutSuccessAction;
