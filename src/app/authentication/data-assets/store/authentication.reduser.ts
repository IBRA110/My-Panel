import { Action, createReducer, on } from '@ngrx/store';
import { signInSuccess } from './authentication.actions';
import { AuthenticationState, initialState } from './authentication.state';

export const authenticationFeatureKey = 'auth';

const authenticationReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { authTokens }) => ({
    ...state,
    authTokens,
  })),
);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action,
) {
  return authenticationReducer(state, action);
}
