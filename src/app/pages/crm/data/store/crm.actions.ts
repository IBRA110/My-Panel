import { createAction, props } from '@ngrx/store';
import { CrmActionsEnum } from './crm.enum';

export const toggleSidebar = createAction(CrmActionsEnum.TOGGLE_SIDEBAR);

export const reverseSideBar = createAction(
  CrmActionsEnum.SIDEBAR_TO_RTL,
  props<{ payload: boolean }>(),
);
