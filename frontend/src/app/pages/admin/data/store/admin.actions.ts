import { createAction, props } from '@ngrx/store';
import { AdminActionsEnum } from './admin.enum';
import { UpdateUser, User } from '../interfaces/user.interfase';
import { CountOfUnreadMessages } from 'src/app/core/interfaces/count-of-unread-messages.interface';

export const toggleSidebar = createAction(AdminActionsEnum.TOGGLE_SIDEBAR);

export const initAdminPanel = createAction(AdminActionsEnum.INIT_ADMIN);

export const destroyAdminPanel = createAction(AdminActionsEnum.DESTROY_ADMIN);

export const loadUserSuccess = createAction(
  AdminActionsEnum.LOAD_USER_SUCCESS,
  props<{ user: User }>(),
);

export const loadUserFailed = createAction(AdminActionsEnum.LOAD_USER_FAILED);

export const updateUser = createAction(
  AdminActionsEnum.UPDATE_USER,
  props<{ updateUser: UpdateUser }>(),
);

export const updateUserSuccess = createAction(
  AdminActionsEnum.UPDATE_USER_SUCCESS,
  props<{ updateUser: UpdateUser }>(),
);
export const updateUserFailed = createAction(
  AdminActionsEnum.UPDATE_USER_FAILED,
);

export const uploadAvatar = createAction(
  AdminActionsEnum.UPLOAD_AVATAR,
  props<{ file: File }>(),
);
export const uploadAvatarSuccess = createAction(
  AdminActionsEnum.UPLOAD_AVATAR_SUCCESS,
  props<{ url: string }>(),
);
export const uploadAvatarFailed = createAction(
  AdminActionsEnum.UPLOAD_AVATAR_FAILED,
);

export const getOnlineUsers = createAction(
  AdminActionsEnum.GET_ONLINE_USERS,
  props<{ users: string[] }>(),
);

export const getOnlineUser = createAction(
  AdminActionsEnum.USER_IS_ONLINE,
  props<{ user: string }>(),
);

export const removeOfflineUser = createAction(
  AdminActionsEnum.USER_IS_OFFLINE,
  props<{ user: string }>(),
);

export const getCountOfUnreadMessages = createAction(
  AdminActionsEnum.COUNT_OF_UNREAD_MESSAGES,
  props<{ payload: CountOfUnreadMessages }>(),
);
