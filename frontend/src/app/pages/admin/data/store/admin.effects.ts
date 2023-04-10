import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../services/admin.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  initAdminPanel,
  loadUserFailed,
  loadUserSuccess,
  updateUser,
  updateUserFailed,
  updateUserSuccess,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  public constructor(
    private actions$: Actions,
    private adminService: AdminService,
  ) {}

  private loadUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initAdminPanel),
      switchMap(() => {
        return this.adminService.getUser().pipe(
          map((data) => {
            return loadUserSuccess({ user: data.data.user });
          }),
          catchError(() => {
            return of(loadUserFailed());
          }),
        );
      }),
    );
  });

  private updateUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) => {
        return this.adminService.updateUser(action.updateUser).pipe(
          map((data) => {
            return updateUserSuccess({
              updateUser: data.data.updateUser,
            });
          }),
          catchError(() => {
            return of(updateUserFailed());
          }),
        );
      }),
    );
  });
}
