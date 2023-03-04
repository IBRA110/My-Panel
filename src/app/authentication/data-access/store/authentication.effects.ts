import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
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

@Injectable()
export class BookingEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private messageService: UiAlertMessagesService,
    private localStorageService: LocalStorageService,
  ) {}

  public signUpEffect$ = createEffect(() => {
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

  public signInEffect$ = createEffect(() => {
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
}
