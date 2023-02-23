import { AuthTokens } from '../interfaces/auth.interface';

export interface AuthenticationState {
  authTokens: AuthTokens;
  isToggleForm: boolean;
}

export const initialState: AuthenticationState = {
  authTokens: null,
  isToggleForm: true,
};
