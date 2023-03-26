import { AuthTokens } from '../interfaces/auth.interface';

export interface AuthenticationState {
  authTokens: AuthTokens;
  isFormToggled: boolean;
  isAuthenticated: boolean;
}

export const initialState: AuthenticationState = {
  authTokens: null,
  isFormToggled: true,
  isAuthenticated: false,
};
