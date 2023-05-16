import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectIsSideBarToggled = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState.isSideBarToggled,
);

export const selectDataForNavSideBar = createSelector(
  selectAdminState,
  (adminState: AdminState) => {
    return {
      isSideBarToggled: adminState.isSideBarToggled,
      user: adminState.user,
      totalCountOfUnreadMessages: adminState.countOfUnreadMessages.totalCount,
    };
  },
);

export const selectUser = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState?.user,
);

export const selectUserId = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState?.user?.id,
);

export const selectUserAvatar = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState?.user?.photoUrl,
);

export const selectOnlineUsers = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState?.onlineUsers,
);

export const selectCountOfUnreadMessagesBySender = createSelector(
  selectAdminState,
  (adminState: AdminState) => adminState?.countOfUnreadMessages.countBySender,
);
