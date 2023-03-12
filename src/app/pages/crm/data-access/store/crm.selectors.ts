import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CrmState } from './crm.state';

const crmFeatureSelector = createFeatureSelector<CrmState>('crm');

export const isSidebarToggledSelector = createSelector(
  crmFeatureSelector,
  (crmState: CrmState) => crmState.isSidebarToggled,
);
