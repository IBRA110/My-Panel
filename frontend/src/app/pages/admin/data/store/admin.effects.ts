import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../services/admin.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  initAdminPanel,
  loadUserFailed,
  loadUserSuccess,
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
}
