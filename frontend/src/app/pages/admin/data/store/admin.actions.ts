import { createAction, props } from '@ngrx/store';
import { AdminActionsEnum } from './admin.enum';
import { UserForNavBar } from '../interfaces/user.interfase';

export const toggleSidebar = createAction(AdminActionsEnum.TOGGLE_SIDEBAR);

export const initAdminPanel = createAction(AdminActionsEnum.INIT_ADMIN);

export const loadUserSuccess = createAction(
  AdminActionsEnum.LOAD_USER_SUCCESS,
  props<{ user: UserForNavBar }>(),
);

export const loadUserFailed = createAction(AdminActionsEnum.LOAD_USER_FAILED);
