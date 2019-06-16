import { LOGOUT } from './constants';
import { UserActionTypes } from '../types/user';
import axios from 'axios';
import redux from 'redux';

function logoutSuccess(): UserActionTypes {
  return {
    type: LOGOUT,
  };
}

export function logout() {
  return (dispatch: redux.Dispatch) => {
    axios
      .post('/logout')
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(logoutSuccess());
        } else {
          console.log('logout failed', res);
        }
      })
      .catch((err: any) => {
        console.log('logout failed', err);
      });
  };
}
