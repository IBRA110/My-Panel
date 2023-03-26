import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, delayWhen, map, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import {
  doNothing,
  refreshToken,
  refreshTokenFailed,
  refreshTokenSuccess,
  signIn,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOut,
  signOutSuccess,
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
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthenticationEffects {
  public constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private messageService: UiAlertMessagesService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private store: Store,
    private router: Router,
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
          map((data) => {
            this.messageService.callSuccessMessage(
              this.translateService.instant('AUTHENTICATION.LOGIN_SUCCESS'),
            );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 3000);
            return signInSuccess({
              authTokens: {
                accessToken: data.data.login.accessToken,
                refreshToken: data.data.login.refreshToken,
              },
            });
          }),
          catchError((error: ErrorResponse) => {
            this.messageService.callErrorMessage(error.message);
            return of(signInFailed());
          }),
        );
      }),
    );
  });

  private refreshTokenEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshToken, refreshTokenSuccess),
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
            map((data) => {
              return refreshTokenSuccess({
                authTokens: {
                  accessToken: data.data.refresh.accessToken,
                  refreshToken: data.data.refresh.refreshToken,
                },
              });
            }),
            catchError((error: ErrorResponse) => {
              return of(refreshTokenFailed());
            }),
          );
      }),
    );
  });

  private logoutEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signOut),
      concatLatestFrom(() => this.store.select(selectAccessToken)),
      switchMap(([, token]) => {
        if (!token) return of(signOutSuccess());
        return this.authService
          .signOut({ refreshToken: token.refreshToken })
          .pipe(
            map((data) => {
              this.messageService.callSuccessMessage(data.data.logout.message);
              setTimeout(() => {
                this.router.navigate(['authentication']);
              }, 3000);
              return signOutSuccess();
            }),
            catchError((error: ErrorResponse) => {
              return of(signOutFailed());
            }),
          );
      }),
    );
  });
}
