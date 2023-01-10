export interface AuthenticationState {
  accessToken: string;
  refreshToken: string;
}

export const initialState: AuthenticationState = {
  accessToken: '',
  refreshToken: '',
};
