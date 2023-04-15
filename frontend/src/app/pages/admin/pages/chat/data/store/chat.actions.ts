import { createAction, props } from '@ngrx/store';
import { ChatActionsEnum } from './chat.enum';
import { ChatUsers } from '../interfaces/users.interface';

export const loadUsers = createAction(
  ChatActionsEnum.LOAD_USERS,
  props<{ userName?: string }>(),
);

export const loadUsersSuccess = createAction(
  ChatActionsEnum.LOAD_USERS_SUCCESS,
  props<{ users: ChatUsers[] }>(),
);

export const loadUsersFaled = createAction(ChatActionsEnum.LOAD_USERS_SUCCESS);
