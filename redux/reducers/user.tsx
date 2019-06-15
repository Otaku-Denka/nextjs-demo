export const userInitialState: UserProps = {
  isAuth: false,
};

export interface UserProps {
  isAuth: boolean;
}

export default function user(state: UserProps = userInitialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
