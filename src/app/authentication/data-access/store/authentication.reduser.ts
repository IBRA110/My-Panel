import { Action, createReducer, on } from '@ngrx/store';
import {
  refreshTokenSuccess,
  signInSuccess,
  signUpSuccess,
  toggleForms,
} from './authentication.actions';
import { AuthenticationState, initialState } from './authentication.state';

export const authenticationFeatureKey = 'auth';

const authenticationReducer = createReducer(
  initialState,
  on(signInSuccess, refreshTokenSuccess, (state, { authTokens }) => ({
    ...state,
    authTokens,
  })),
  on(signUpSuccess, (state) => ({
    ...state,
    isToggleForm: true,
  })),
  on(toggleForms, (state, { payload }) => ({
    ...state,
    isToggleForm: payload,
  })),
);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action,
) {
  return authenticationReducer(state, action);
}
