import { CommonActionTypes } from '../actions/common';

export const commonInitialState: CommonState = {
  pageLoading: false,
};

export interface CommonState {
  pageLoading: boolean;
}

export default function common(
  state: CommonState = commonInitialState,
  action: CommonActionTypes,
) {
  switch (action.type) {
    default:
      return state;
  }
}
