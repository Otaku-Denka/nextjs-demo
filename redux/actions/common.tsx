import * as ACTIONS from './constants';

interface TogglePageLoadingAction {
  type: string;
}

export function togglePageLoading(): TogglePageLoadingAction {
  return {
    type: ACTIONS.TOGGLE_PAGE_LOADING,
  };
}

export type CommonActionTypes = TogglePageLoadingAction;
