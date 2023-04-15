import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  refreshTokenFailed,
  refreshTokenSuccess,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  toggleForms,
} from './authentication.actions';
import { AuthenticationState, initialState } from './authentication.state';
import { loadUserFailed } from 'src/app/pages/admin/data/store/admin.actions';

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
  on(refreshTokenFailed, signOutSuccess, loadUserFailed, () => initialState),
);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action,
) {
  return authenticationReducer(state, action);
}
