import * as fromUi from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(
  state: State = initialState,
  action: fromUi.UIActions
) {
  switch (action.type) {
    case fromUi.UIActionTypes.StartLoading: {
      return {
        ...state,
        isLoading: true
      };
      break;
    }
    case fromUi.UIActionTypes.StopLoading: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
