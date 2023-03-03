import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
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

@Injectable()
export class BookingEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private messageService: UiAlertMessagesService,
  ) {}

  public signUpEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap((action) => {
        return this.authService
          .signUp({
            userName: action.userName,
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((data) => {
              this.messageService.callSuccessMessage(
                data.data.registration.message,
              );
              return signUpSuccess();
            }),
            catchError((error) => {
              this.messageService.callErrorMessage(error);
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
        return this.authService
          .signIn({
            userName: action.userName,
            password: action.password,
          })
          .pipe(
            map((data) => {
              this.messageService.callSuccessMessage('Login Success!');
              return signInSuccess({
                authTokens: {
                  accessToken: data.data.login.accessToken,
                  refreshToken: data.data.login.refreshToken,
                },
              });
            }),
            catchError((error) => {
              this.messageService.callErrorMessage(error);
              return of(signUpFailed());
            }),
          );
      }),
    );
  });
}
