import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  delayWhen,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of, timer } from 'rxjs';
import {
  doNothing,
  refreshToken,
  refreshTokenFailed,
  refreshTokenSuccess,
  signIn,
  signInSuccess,
  signUp,
  signUpFailed,
  signUpSuccess,
} from './authentication.actions';
import { AuthenticationService } from '../services/authentication.service';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { ErrorResponse } from 'src/app/core/interfaces/error.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { getAccessToken } from './authentication.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class BookingEffects {
  public constructor(
    private _actions$: Actions,
    private _authService: AuthenticationService,
    private _messageService: UiAlertMessagesService,
    private _localStorageService: LocalStorageService,
    private _store: Store,
  ) {}

  private _signUpEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(signUp),
      switchMap((action) => {
        return this._authService.signUp(action).pipe(
          map((data) => {
            this._messageService.callSuccessMessage(
              data.data.registration.message,
            );
            return signUpSuccess();
          }),
          catchError((error: ErrorResponse) => {
            this._messageService.callErrorMessage(error.message);
            return of(signUpFailed());
          }),
        );
      }),
    );
  });

  private _signInEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(signIn),
      switchMap((action) => {
        return this._authService.signIn(action).pipe(
          mergeMap((data) => {
            this._messageService.callSuccessMessage('Login Success!');
            this._localStorageService.setTokens({
              accessToken: data.data.login.accessToken,
              refreshToken: data.data.login.refreshToken,
            });
            return [
              signInSuccess({
                authTokens: {
                  accessToken: data.data.login.accessToken,
                  refreshToken: data.data.login.refreshToken,
                },
              }),
              refreshToken(),
            ];
          }),
          catchError((error: ErrorResponse) => {
            this._messageService.callErrorMessage(error.message);
            return of(signUpFailed());
          }),
        );
      }),
    );
  });

  private _refreshTokenEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(refreshToken),
      withLatestFrom(this._store.select(getAccessToken)),
      delayWhen(([, token]) => {
        const expiration = this._localStorageService.getExpiration(
          token.accessToken,
        );
        return timer(
          expiration ? expiration * 1000 - 60 * 1000 - Date.now() : 0,
        );
      }),
      switchMap(([, token]) => {
        if (!token) return of(doNothing());
        return this._authService
          .refresh({ refreshToken: token.refreshToken })
          .pipe(
            switchMap((data) => {
              this._localStorageService.setTokens({
                accessToken: data.data.refresh.accessToken,
                refreshToken: data.data.refresh.refreshToken,
              });
              return [
                refreshTokenSuccess({
                  authTokens: {
                    accessToken: data.data.refresh.accessToken,
                    refreshToken: data.data.refresh.refreshToken,
                  },
                }),
                refreshToken(),
              ];
            }),
            catchError((error: ErrorResponse) => {
              return of(refreshTokenFailed());
            }),
          );
      }),
    ),
  );
}
