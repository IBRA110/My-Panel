import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const authState = createFeatureSelector<AuthenticationState>('auth');

export const toKnowIsSignIn = createSelector(
  authState,
  (state) => state.isToggleForm,
);

export const getAccessToken = createSelector(
  authState,
  (state) => state.authTokens.accessToken,
);
