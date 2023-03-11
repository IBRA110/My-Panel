import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  refreshTokenSuccess,
  signInSuccess,
  signUpSuccess,
  toggleForms,
} from './authentication.actions';
import { AuthenticationState, initialState } from './authentication.state';

export const authenticationFeatureKey = 'auth';

const authenticationReducer = createRehydrateReducer(
  authenticationFeatureKey,
  initialState,
  on(
    signInSuccess,
    refreshTokenSuccess,
    (state, { authTokens }): AuthenticationState => ({
      ...state,
      authTokens,
    }),
  ),
  on(
    signUpSuccess,
    (state): AuthenticationState => ({
      ...state,
      isToggleForm: true,
    }),
  ),
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
