import { createAction, props } from '@ngrx/store';
import { AuthTokens } from '../interfaces/auth.interface';
import { AuthActionsEnum } from './authentication.enum';

export const signIn = createAction(
  AuthActionsEnum.SIGN_IN,
  props<{ userName: string; password: string }>(),
);

export const signInSuccess = createAction(
  AuthActionsEnum.SIGN_IN_SUCCESS,
  props<{ authTokens: AuthTokens }>(),
);

export const signInFailed = createAction(AuthActionsEnum.SIGN_IN_FAILED);

export const signUp = createAction(
  AuthActionsEnum.SIGN_UP,
  props<{ userName: string; email: string; password: string }>(),
);

export const signUpSuccess = createAction(AuthActionsEnum.SIGN_UP_SUCCESS);

export const signUpFailed = createAction(AuthActionsEnum.SIGN_UP_FAILED);

export const toggleForms = createAction(AuthActionsEnum.TOGGLE_FORMS);

export const refreshToken = createAction(AuthActionsEnum.REFRESH_TOKEN);

export const refreshTokenSuccess = createAction(
  AuthActionsEnum.REFRESH_TOKEN_SUCCESS,
  props<{ authTokens: AuthTokens }>(),
);

export const refreshTokenFailed = createAction(
  AuthActionsEnum.REFRESH_TOKEN_FAILED,
);

export const signOut = createAction(AuthActionsEnum.SIGN_OUT);
export const signOutSuccess = createAction(AuthActionsEnum.SIGN_OUT_SUCCESS);
export const signOutFailed = createAction(AuthActionsEnum.SIGN_OUT_FAILED);
