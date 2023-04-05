import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectIsSideBarToggled = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState.isSideBarToggled,
);

export const selectUserForNavBar = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState.user,
);

export const selectUserAvatar = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState.user.images.find((x) => x.isMain),
);
