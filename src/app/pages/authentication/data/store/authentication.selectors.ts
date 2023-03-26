import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const selectAuthState =
  createFeatureSelector<AuthenticationState>('auth');

export const selectIsFormToggled = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state.isFormToggled,
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state.authTokens,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthenticationState) => state.isAuthenticated,
);
