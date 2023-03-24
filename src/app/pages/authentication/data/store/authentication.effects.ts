import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  delayWhen,
  map,
  mergeMap,
  switchMap,
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
import { selectAccessToken } from './authentication.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthenticationEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private messageService: UiAlertMessagesService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {}

  private signUpEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap((action) => {
        return this.authService.signUp(action).pipe(
          map((data) => {
            this.messageService.callSuccessMessage(
              data.data.registration.message,
            );
            return signUpSuccess();
          }),
          catchError((error: ErrorResponse) => {
            this.messageService.callErrorMessage(error.message);
            return of(signUpFailed());
          }),
        );
      }),
    );
  });

  private signInEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      switchMap((action) => {
        return this.authService.signIn(action).pipe(
          mergeMap((data) => {
            this.messageService.callSuccessMessage('Login Success!');
            this.localStorageService.setTokens({
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
            this.messageService.callErrorMessage(error.message);
            return of(signUpFailed());
          }),
        );
      }),
    );
  });

  private refreshTokenEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshToken),
      concatLatestFrom(() => this.store.select(selectAccessToken)),
      delayWhen(([, token]) => {
        const expiration = this.localStorageService.getExpiration(
          token.accessToken,
        );
        return timer(
          expiration ? expiration * 1000 - 60 * 1000 - Date.now() : 0,
        );
      }),
      switchMap(([, token]) => {
        if (!token) return of(doNothing());
        return this.authService
          .refresh({ refreshToken: token.refreshToken })
          .pipe(
            switchMap((data) => {
              this.localStorageService.setTokens({
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
    );
  });
}
