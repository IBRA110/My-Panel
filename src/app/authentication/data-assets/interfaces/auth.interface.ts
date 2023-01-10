export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignIn {
  userName: string;
  password: string;
}

export interface SignUp {
  userName: string;
  email: string;
  password: string;
}
