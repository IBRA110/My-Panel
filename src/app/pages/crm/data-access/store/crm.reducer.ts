import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { toggleSidebar } from './crm.actions';
import { CrmState, initialState } from './crm.state';

const crmFeatureKey = 'crm';

const crmReducer = createRehydrateReducer(
  crmFeatureKey,
  initialState,
  on(toggleSidebar, (state, { payload }) => ({
    ...state,
    isSidebarToggled: payload,
  })),
);

export function reducer(state: CrmState, action: Action) {
  return crmReducer(state, action);
}
