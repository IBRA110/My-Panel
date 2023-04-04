import { createAction } from '@ngrx/store';
import { AdminActionsEnum } from './admin.enum';

export const toggleSidebar = createAction(AdminActionsEnum.TOGGLE_SIDEBAR);
