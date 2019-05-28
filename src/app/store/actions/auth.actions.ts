import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SetAuthenticated = '[Auth] Set Authenticated',
    SetUnauthenticated = '[Auth] Set Unauthenticated'
}

export class SetAuthenticated implements Action {
    readonly type = AuthActionTypes.SetAuthenticated;
}

export class SetUnauthenticated implements Action {
    readonly type = AuthActionTypes.SetUnauthenticated;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
