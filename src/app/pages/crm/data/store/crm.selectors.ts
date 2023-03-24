import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CrmState } from './crm.state';

const selectCrmState = createFeatureSelector<CrmState>('crm');

export const selectIsSidebarToggled = createSelector(
  selectCrmState,
  (crmState: CrmState) => crmState.isSidebarToggled,
);
