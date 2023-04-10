import { createAction, props } from '@ngrx/store';
import { AdminActionsEnum } from './admin.enum';
import { UpdateUser, UpdatedUser, User } from '../interfaces/user.interfase';

export const toggleSidebar = createAction(AdminActionsEnum.TOGGLE_SIDEBAR);

export const initAdminPanel = createAction(AdminActionsEnum.INIT_ADMIN);

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
  props<{ updateUser: UpdatedUser }>(),
);
export const updateUserFailed = createAction(
  AdminActionsEnum.UPDATE_USER_FAILED,
);
