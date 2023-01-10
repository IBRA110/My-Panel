import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { signUp, signUpFailed, signUpSuccess } from './authentication.actions';
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
            map((data: string) => {
              this.messageService.callSuccessMessage(data);
              return signUpSuccess();
            }),
            catchError((err) => {
              return of(signUpFailed());
            }),
          );
      }),
    );
  });
}
