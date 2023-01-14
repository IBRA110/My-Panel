import { AuthTokens } from '../interfaces/auth.interface';

export interface AuthenticationState {
  authTokens: AuthTokens;
}

export const initialState: AuthenticationState = {
  authTokens: null,
};
