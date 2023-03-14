import { createAction } from '@ngrx/store';
import { CrmActionsEnum } from './crm.enum';

export const toggleSidebar = createAction(CrmActionsEnum.TOGGLE_SIDEBAR);
