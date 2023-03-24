import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const selectAuthState =
  createFeatureSelector<AuthenticationState>('auth');

export const selectToKnowIsSignIn = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state.isToggleForm,
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state.authTokens,
);
