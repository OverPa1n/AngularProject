import {UserModel} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel,
  authError: string,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      )
      return {
        ...state,
        user: user,
        authError: null,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    default:
      return state
  }
}
