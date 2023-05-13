import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  getCountOfUnreadMessages,
  getOnlineUser,
  getOnlineUsers,
  loadUserFailed,
  loadUserSuccess,
  removeOfflineUser,
  toggleSidebar,
  updateUserSuccess,
  uploadAvatarSuccess,
} from './admin.actions';
import { AdminState, initialState } from './admin.state';
import {
  refreshTokenFailed,
  signOutSuccess,
} from 'src/app/pages/authentication/data/store/authentication.actions';

export const adminFeatureKey = 'admin';

const adminReducer = createRehydrateReducer(
  adminFeatureKey,
  initialState,
  on(toggleSidebar, (state) => ({
    ...state,
    isSideBarToggled: !state.isSideBarToggled,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(updateUserSuccess, (state, { updateUser }) => ({
    ...state,
    user: {
      ...state.user,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      dateOfBirth: updateUser.dateOfBirth,
      introduction: updateUser.introduction,
      interests: updateUser.interests,
      city: updateUser.city,
      country: updateUser.country,
    },
  })),
  on(uploadAvatarSuccess, (state, { url }) => ({
    ...state,
    user: {
      ...state.user,
      photoUrl: url,
    },
  })),
  on(getOnlineUsers, (state, { users }) => ({
    ...state,
    onlineUsers: users,
  })),
  on(getOnlineUser, (state, { user }) => ({
    ...state,
    onlineUsers: [...state.onlineUsers, user],
  })),
  on(removeOfflineUser, (state, { user }) => ({
    ...state,
    onlineUsers: [...state.onlineUsers.filter((x) => x !== user)],
  })),
  on(getCountOfUnreadMessages, (state, { payload }) => ({
    ...state,
    countOfUnreadMessages: payload,
  })),
  on(refreshTokenFailed, signOutSuccess, loadUserFailed, () => initialState),
);

export function reducer(state: AdminState | undefined, action: Action) {
  return adminReducer(state, action);
}
