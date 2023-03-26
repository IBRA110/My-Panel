import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  refreshTokenFailed,
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
      authTokens: authTokens,
      isAuthenticated: true,
    }),
  ),
  on(
    signUpSuccess,
    (state): AuthenticationState => ({
      ...state,
      isFormToggled: true,
    }),
  ),
  on(toggleForms, (state) => ({
    ...state,
    isFormToggled: !state.isFormToggled,
  })),
  on(refreshTokenFailed, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action,
) {
  return authenticationReducer(state, action);
}
