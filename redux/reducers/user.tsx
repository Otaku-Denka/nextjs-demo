export const userInitialState: any = {
  isAuth: false,
};

export interface UserProps {
  isAuth: boolean;
}

export default function user(state: any = userInitialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
