import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import * as adminActions from './admin.actions';
import { AdminState, initialState } from './admin.state';
import {
  refreshTokenFailed,
  signOutSuccess,
} from 'src/app/pages/authentication/data/store/authentication.actions';
import { setRecipient } from '../../pages/chat/data/store/chat.actions';

export const adminFeatureKey = 'admin';

const adminReducer = createRehydrateReducer(
  adminFeatureKey,
  initialState,
  on(adminActions.toggleSidebar, (state) => ({
    ...state,
    isSideBarToggled: !state.isSideBarToggled,
  })),
  on(adminActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(adminActions.updateUserSuccess, (state, { updateUser }) => ({
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
  on(adminActions.uploadAvatarSuccess, (state, { url }) => ({
    ...state,
    user: {
      ...state.user,
      photoUrl: url,
    },
  })),
  on(adminActions.getOnlineUsers, (state, { users }) => ({
    ...state,
    onlineUsers: users,
  })),
  on(adminActions.getOnlineUser, (state, { user }) => ({
    ...state,
    onlineUsers: [...state.onlineUsers, user],
  })),
  on(adminActions.removeOfflineUser, (state, { user }) => ({
    ...state,
    onlineUsers: [...state.onlineUsers.filter((x) => x !== user)],
  })),
  on(adminActions.getCountOfUnreadMessages, (state, { payload }) => ({
    ...state,
    countOfUnreadMessages: {
      totalCount: payload.totalCount,
      countBySender: payload.countBySender,
    },
  })),
  on(adminActions.setNewMessageCount, (state, { username }) => ({
    ...state,
    countOfUnreadMessages: {
      totalCount: state.countOfUnreadMessages.totalCount + 1,
      countBySender: setNewMessage(
        { ...state.countOfUnreadMessages.countBySender },
        username,
      ),
    },
  })),
  on(setRecipient, (state, action) => ({
    ...state,
    countOfUnreadMessages: {
      totalCount:
        state.countOfUnreadMessages.totalCount -
        state.countOfUnreadMessages.countBySender[action.recipientUsername]
          ? state.countOfUnreadMessages.countBySender[action.recipientUsername]
          : 0,
      countBySender: removeUnreadMessageCount(
        { ...state.countOfUnreadMessages.countBySender },
        action.recipientUsername,
      ),
    },
  })),
  on(
    refreshTokenFailed,
    signOutSuccess,
    adminActions.loadUserFailed,
    () => initialState,
  ),
);

export function reducer(state: AdminState | undefined, action: Action) {
  return adminReducer(state, action);
}

function setNewMessage(
  dict: Record<string, number>,
  username: string,
): Record<string, number> {
  if (!!dict[username]) {
    dict[username] += 1;
    return dict;
  }
  dict[username] = 1;
  return dict;
}

function removeUnreadMessageCount(
  dict: Record<string, number>,
  username: string,
): Record<string, number> {
  if (!!dict[username]) {
    dict[username] = 0;
    return dict;
  }
  dict[username] = 0;
  return dict;
}
