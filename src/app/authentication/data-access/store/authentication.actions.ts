import { createAction, props } from '@ngrx/store';
import { AuthTokens } from '../interfaces/auth.interface';
import { AuthActions } from './authentication.enum';

export const signIn = createAction(
  AuthActions.SIGN_IN,
  props<{ userName: string; password: string }>(),
);

export const signInSuccess = createAction(
  AuthActions.SIGN_IN_SUCCESS,
  props<{ authTokens: AuthTokens }>(),
);

export const signInFailed = createAction(AuthActions.SIGN_IN_FAILED);

export const signUp = createAction(
  AuthActions.SIGN_UP,
  props<{ userName: string; email: string; password: string }>(),
);

export const signUpSuccess = createAction(AuthActions.SIGN_UP_SUCCESS);

export const signUpFailed = createAction(AuthActions.SIGN_UP_FAILED);

export const toggleForms = createAction(
  AuthActions.TOGGLE_FORMS,
  props<{ payload: boolean }>(),
);

export const refreshToken = createAction(AuthActions.REFRESH_TOKEN);
