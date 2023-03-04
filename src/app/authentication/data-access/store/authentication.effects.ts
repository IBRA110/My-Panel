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
  refreshToken,
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

@Injectable()
export class BookingEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private messageService: UiAlertMessagesService,
    private localStorageService: LocalStorageService,
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

  // public refreshTokenEffect$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(refreshToken),
  //    withLatestFrom(this.store.select(getAccessToken)),
  //    delayWhen(([, token]) => {
  //     const expiration = this.localStorageService.getExpiration(
  //       token.accessToken,
  //     );
  //     return timer(
  //       expiration ? expiration * 1000 - 60 * 1000 - Date.now() : 0,
  //     );
  //   }),
  //   switchMap(([, token]) => {
  //     if (!token) return of(authActions.doNothing());
  //     return this.userService
  //       .refreshTokenUser({ token: token.refreshToken })
  //       .pipe(
  //         switchMap((refreshTokenResponse) => {
  //           this.localStorageService.updateLocalStorageData(
  //             refreshTokenResponse.data.refreshTokenUser,
  //           );
  //           return [
  //             authActions.refreshTokenSuccess({
  //               authToken: refreshTokenResponse.data.refreshTokenUser,
  //             }),
  //             authActions.refreshToken(),
  //           ];
  //         }),
  //         catchError(() => {
  //           return of(authActions.refreshTokenFailed());
  //         }),
  //       );
  //   }),
  // ),
  // );
}
