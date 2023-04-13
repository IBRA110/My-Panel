import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../services/admin.service';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import {
  initAdminPanel,
  loadUserFailed,
  loadUserSuccess,
  updateUser,
  updateUserFailed,
  updateUserSuccess,
  uploadAvatar,
  uploadAvatarFailed,
  uploadAvatarSuccess,
} from './admin.actions';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AdminEffects {
  public constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private alertMessagesService: UiAlertMessagesService,
    private popupService: PopupService,
    private translateService: TranslateService,
  ) {}

  private loadUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initAdminPanel),
      concatMap(() => {
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
            this.popupService.close('my-settings');
            this.alertMessagesService.callSuccessMessage(
              this.translateService.instant('PROFILE.PROFILE_UPDATE'),
            );
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

  private uploadAvatarEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadAvatar),
      switchMap((payload) => {
        return this.adminService.loadAvatar(payload.file).pipe(
          map((url) => {
            this.alertMessagesService.callSuccessMessage(
              this.translateService.instant('PROFILE.AVATAR_UPLOAD'),
            );
            return uploadAvatarSuccess({ url: url.url });
          }),
          catchError(() => of(uploadAvatarFailed())),
        );
      }),
    );
  });
}
