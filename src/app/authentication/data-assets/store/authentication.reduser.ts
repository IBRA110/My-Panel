import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticationState, initialState } from './authentication.state';

export const authenticationFeatureKey = 'authentication';

const bookingsReducer = createReducer(initialState);

export function reducer(
  state: AuthenticationState | undefined,
  action: Action,
) {
  return bookingsReducer(state, action);
}
