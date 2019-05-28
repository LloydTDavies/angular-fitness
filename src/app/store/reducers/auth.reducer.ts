import * as fromAuth from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(
  state: State = initialState,
  action: fromAuth.AuthActions
) {
  switch (action.type) {
    case fromAuth.AuthActionTypes.SetAuthenticated:
        return {
            ...state,
            isAuthenticated: true
        };
    case fromAuth.AuthActionTypes.SetUnauthenticated:
        return {
            ...state,
            isAuthenticated: false
        };
    default:
        return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
