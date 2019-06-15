import { CommonActionTypes } from '../actions/common';

export const commonInitialState: CommonProps = {
  pageLoading: false,
};

export interface CommonProps {
  pageLoading: boolean;
}

export default function common(
  state: CommonProps = commonInitialState,
  action: CommonActionTypes,
) {
  switch (action.type) {
    default:
      return state;
  }
}
